import { chatConfig } from './config';
import type { ChatMessage } from './messages';
import { buildOpenAiRequest, errorCodeForStatus, type ChatErrorCode } from './openAiRequest';

export type { ChatErrorCode };

export class ChatError extends Error {
  readonly code: ChatErrorCode;

  constructor(code: ChatErrorCode) {
    super(code);
    this.name = 'ChatError';
    this.code = code;
  }
}

export interface StreamChatOptions {
  messages: ChatMessage[];
  /** Local server proxy URL. Used when no visitor-supplied key is given. */
  proxyUrl: string;
  /** Visitor-supplied key; requests then go straight from the browser to OpenAI. */
  apiKey?: string | undefined;
  signal?: AbortSignal;
  onDelta: (text: string) => void;
}

/** Whether the local server proxy is running and has a key configured. */
export async function isProxyAvailable(proxyUrl: string): Promise<boolean> {
  try {
    const response = await fetch(`${proxyUrl}/status`, { headers: { Accept: 'application/json' } });
    if (!response.ok) return false;
    const body = (await response.json()) as { available?: unknown };
    return body.available === true;
  } catch {
    return false;
  }
}

/**
 * Checks a visitor-supplied key before chatting. OpenAI's error responses to chat POSTs omit
 * CORS headers, so the browser would report a rejected key as a generic network failure.
 */
export async function verifyApiKey(apiKey: string): Promise<'ok' | ChatErrorCode> {
  try {
    const response = await fetch(chatConfig.openAiModelsUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    return response.ok ? 'ok' : errorCodeForStatus(response.status);
  } catch {
    return 'unavailable';
  }
}

async function errorFrom(response: Response, viaProxy: boolean): Promise<ChatError> {
  if (viaProxy) {
    try {
      const body = (await response.json()) as { code?: ChatErrorCode };
      if (body.code) return new ChatError(body.code);
    } catch {
      // Fall through to the status-based mapping.
    }
  }
  return new ChatError(errorCodeForStatus(response.status));
}

/** Reads an OpenAI Chat Completions server-sent event stream, reporting text as it arrives. */
async function readStream(body: ReadableStream<Uint8Array>, onDelta: (text: string) => void) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let reply = '';

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      const data = line.trim();
      if (!data.startsWith('data:')) continue;
      const payload = data.slice('data:'.length).trim();
      if (payload === '[DONE]') return reply;

      try {
        const chunk = JSON.parse(payload) as {
          choices?: { delta?: { content?: string | null } }[];
        };
        const text = chunk.choices?.[0]?.delta?.content;
        if (text) {
          reply += text;
          onDelta(text);
        }
      } catch {
        // Ignore keep-alive comments or partial frames.
      }
    }
  }
  return reply;
}

/** Sends the conversation and streams the reply. Resolves with the full reply text. */
export async function streamChat({
  messages,
  proxyUrl,
  apiKey,
  signal,
  onDelta,
}: StreamChatOptions): Promise<string> {
  const viaProxy = !apiKey;
  let response: Response;

  try {
    response = viaProxy
      ? await fetch(proxyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages }),
          signal: signal ?? null,
        })
      : await fetch(chatConfig.openAiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify(buildOpenAiRequest(messages)),
          signal: signal ?? null,
        });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new ChatError('unavailable');
  }

  if (!response.ok || !response.body) throw await errorFrom(response, viaProxy);
  return readStream(response.body, onDelta);
}
