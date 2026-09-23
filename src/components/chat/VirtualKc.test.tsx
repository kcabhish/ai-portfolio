import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { chatConfig } from '../../chat/config';
import { VirtualKc } from './VirtualKc';

function sseResponse(text: string): Response {
  const payload = `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\ndata: [DONE]\n\n`;
  return new Response(payload, { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
}

function jsonResponse(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function openChat() {
  const user = userEvent.setup();
  render(<VirtualKc />);
  await user.click(screen.getByRole('button', { name: /ask virtual kc/i }));
  const dialog = await screen.findByRole('dialog', { name: chatConfig.assistantName });
  return { user, dialog };
}

describe('VirtualKc', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('answers through the server proxy when it has a key', async () => {
    const fetchMock = vi.fn((url: string) =>
      Promise.resolve(
        url.endsWith('/status')
          ? jsonResponse({ available: true })
          : sseResponse('I work at CACI.'),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);
    const { user } = await openChat();

    const input = await screen.findByRole('textbox', { name: /ask virtual kc/i });
    await user.type(input, 'Where do you work?{Enter}');

    expect(await screen.findByText('I work at CACI.', { selector: 'li' })).toBeInTheDocument();
    expect(screen.getByText('Where do you work?', { selector: 'li' })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('I work at CACI.'));
  });

  it('asks for an API key when the server has none, then uses it', async () => {
    const fetchMock = vi.fn((url: string) =>
      Promise.resolve(
        url.endsWith('/status') ? jsonResponse({ available: false }) : sseResponse('Hello!'),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);
    const { user } = await openChat();

    const keyInput = await screen.findByLabelText('OpenAI API key');
    expect(screen.getByText(/couldn’t find an openai api key/i)).toBeInTheDocument();

    await user.type(keyInput, 'not-a-key{Enter}');
    expect(keyInput).toHaveAttribute('aria-invalid', 'true');
    expect(keyInput).toHaveAccessibleDescription(/starts with "sk-"/i);

    await user.clear(keyInput);
    await user.type(keyInput, 'sk-test-0123456789abcdefghij{Enter}');
    await user.type(await screen.findByRole('textbox', { name: /ask virtual kc/i }), 'Hi{Enter}');

    expect(await screen.findByText('Hello!', { selector: 'li' })).toBeInTheDocument();
    const call = fetchMock.mock.calls.find(([url]) => url === chatConfig.openAiUrl) as unknown as
      [string, RequestInit] | undefined;
    expect(new Headers(call?.[1].headers).get('Authorization')).toBe(
      'Bearer sk-test-0123456789abcdefghij',
    );
  });

  it('checks a visitor key before chatting and explains a rejection', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) =>
        Promise.resolve(
          url === chatConfig.openAiModelsUrl
            ? jsonResponse({ error: {} }, 401)
            : jsonResponse({ available: false }),
        ),
      ),
    );
    const { user } = await openChat();

    await user.type(
      await screen.findByLabelText('OpenAI API key'),
      'sk-wrong-0123456789abcdefghij{Enter}',
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(/openai rejected that key/i);
    expect(screen.getByLabelText('OpenAI API key')).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: /ask virtual kc/i })).not.toBeInTheDocument();
  });

  it('falls back to asking for a key when the server key is rejected', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) =>
        Promise.resolve(
          url.endsWith('/status')
            ? jsonResponse({ available: true })
            : jsonResponse({ code: 'invalid-key' }, 502),
        ),
      ),
    );
    const { user } = await openChat();

    await user.type(
      await screen.findByRole('textbox', { name: /ask virtual kc/i }),
      'Hello{Enter}',
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(/server’s openai key was rejected/i);
    expect(screen.getByLabelText('OpenAI API key')).toBeInTheDocument();
  });

  it('closes with Escape and returns focus to the launcher', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(jsonResponse({ available: true }))),
    );
    const { user, dialog } = await openChat();

    await user.keyboard('{Escape}');

    await waitFor(() => expect(dialog).not.toBeVisible());
    expect(screen.getByRole('button', { name: /ask virtual kc/i })).toHaveFocus();
  });
});
