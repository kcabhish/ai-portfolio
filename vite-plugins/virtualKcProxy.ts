import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Connect, Plugin } from 'vite';
import { chatConfig } from '../src/chat/config.ts';
import { sanitizeMessages } from '../src/chat/messages.ts';
import {
  buildOpenAiRequest,
  errorCodeForStatus,
  type ChatErrorCode,
} from '../src/chat/openAiRequest.ts';

interface VirtualKcProxyOptions {
  base: string;
  /** Server-side only. Never pass this through `define` or a `VITE_*` variable. */
  apiKey: string | undefined;
  model: string | undefined;
}

const MAX_BODY_BYTES = 64 * 1024;

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, body: object) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function sendError(res: ServerResponse, status: number, code: ChatErrorCode) {
  sendJson(res, status, { code });
}

/** Browsers send `Origin` on cross-site POSTs; only accept requests from this server's own pages. */
function isSameOrigin(req: IncomingMessage): boolean {
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

/**
 * Local dev/preview proxy for the Virtual KC chat. Keeps the OpenAI key on the server by
 * forwarding validated chat requests and streaming the reply back. Static hosting (GitHub Pages)
 * has no server, so the chat there falls back to asking the visitor for a key.
 */
export function virtualKcProxy({ base, apiKey, model }: VirtualKcProxyOptions): Plugin {
  const endpoint = chatConfig.proxyPath;

  async function handleChat(req: IncomingMessage, res: ServerResponse) {
    if (!apiKey) return sendError(res, 503, 'unavailable');
    if (!isSameOrigin(req)) return sendError(res, 403, 'bad-request');

    let messages;
    try {
      messages = sanitizeMessages(
        (JSON.parse(await readBody(req)) as { messages?: unknown }).messages,
      );
    } catch {
      messages = null;
    }
    if (!messages) return sendError(res, 400, 'bad-request');

    const controller = new AbortController();
    res.on('close', () => controller.abort());

    try {
      const upstream = await fetch(chatConfig.openAiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify(buildOpenAiRequest(messages, model)),
        signal: controller.signal,
      });

      if (!upstream.ok || !upstream.body) {
        console.warn(`[virtual-kc] OpenAI responded with HTTP ${upstream.status}`);
        return sendError(res, 502, errorCodeForStatus(upstream.status));
      }

      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-store',
        Connection: 'keep-alive',
      });
      for await (const chunk of upstream.body) res.write(chunk);
      res.end();
    } catch {
      if (controller.signal.aborted) return;
      if (res.headersSent) res.end();
      else sendError(res, 502, 'unavailable');
    }
  }

  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    const pathname = (req.url ?? '').split('?')[0] ?? '';
    const relative = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.slice(1);

    if (relative === `${endpoint}/status` && req.method === 'GET') {
      return sendJson(res, 200, { available: Boolean(apiKey) });
    }
    if (relative === endpoint) {
      if (req.method !== 'POST') return sendError(res, 405, 'bad-request');
      void handleChat(req, res);
      return;
    }
    next();
  };

  return {
    name: 'virtual-kc-proxy',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
