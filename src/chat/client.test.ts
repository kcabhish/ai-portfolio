import { ChatError, isProxyAvailable, streamChat } from './client';
import { chatConfig } from './config';

function sseResponse(chunks: string[]): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
  return new Response(body, { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
}

const delta = (content: string) =>
  `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`;

const messages = [{ role: 'user' as const, content: 'Where do you work?' }];

describe('chat client', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('streams text deltas through the server proxy, even when frames split mid-line', async () => {
    const frame = delta('I work at CACI.');
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        sseResponse([delta('Hi. '), frame.slice(0, 10), frame.slice(10), 'data: [DONE]\n\n']),
      );
    vi.stubGlobal('fetch', fetchMock);
    const onDelta = vi.fn();

    const reply = await streamChat({ messages, proxyUrl: '/api/virtual-kc', onDelta });

    expect(reply).toBe('Hi. I work at CACI.');
    expect(onDelta).toHaveBeenCalledTimes(2);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/virtual-kc');
    expect(new Headers(init.headers).has('Authorization')).toBe(false);
    expect(JSON.parse(init.body as string)).toEqual({ messages });
  });

  it('calls OpenAI directly with a visitor key and a server-built system prompt', async () => {
    const fetchMock = vi.fn().mockResolvedValue(sseResponse([delta('Hello'), 'data: [DONE]\n\n']));
    vi.stubGlobal('fetch', fetchMock);

    await streamChat({ messages, proxyUrl: '/api', apiKey: 'sk-test', onDelta: () => {} });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(init.body as string) as { messages: { role: string }[] };
    expect(url).toBe(chatConfig.openAiUrl);
    expect(new Headers(init.headers).get('Authorization')).toBe('Bearer sk-test');
    expect(body.messages[0]?.role).toBe('system');
    expect(body.messages.slice(1)).toEqual(messages);
  });

  it('reports a rejected key with a typed error code', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 401 })));

    await expect(
      streamChat({ messages, proxyUrl: '/api', apiKey: 'sk-bad', onDelta: () => {} }),
    ).rejects.toEqual(new ChatError('invalid-key'));
  });

  it('treats a missing proxy (static hosting) as unavailable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('<!doctype html>', { status: 404 })),
    );

    await expect(isProxyAvailable('/api/virtual-kc')).resolves.toBe(false);
  });
});
