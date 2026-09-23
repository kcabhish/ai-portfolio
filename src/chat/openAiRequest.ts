import { buildSystemPrompt } from './careerContext.ts';
import { chatConfig } from './config.ts';
import type { ChatMessage } from './messages.ts';

/** Chat Completions request body; the system prompt is always rebuilt here, never taken from input. */
export function buildOpenAiRequest(messages: ChatMessage[], model: string = chatConfig.model) {
  return {
    model,
    messages: [{ role: 'system', content: buildSystemPrompt() }, ...messages],
    stream: true,
    max_completion_tokens: chatConfig.maxOutputTokens,
    reasoning_effort: 'low',
  };
}

export type ChatErrorCode = 'invalid-key' | 'rate-limited' | 'unavailable' | 'bad-request';

/** Maps an OpenAI HTTP status to a code the UI can explain without exposing upstream details. */
export function errorCodeForStatus(status: number): ChatErrorCode {
  if (status === 401 || status === 403) return 'invalid-key';
  if (status === 429) return 'rate-limited';
  if (status === 400) return 'bad-request';
  return 'unavailable';
}
