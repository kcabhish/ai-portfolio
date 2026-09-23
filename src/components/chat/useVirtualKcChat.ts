import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChatError,
  isProxyAvailable,
  streamChat,
  verifyApiKey,
  type ChatErrorCode,
} from '../../chat/client';
import { chatConfig } from '../../chat/config';
import type { ChatMessage } from '../../chat/messages';

/**
 * `checking`: probing the local server proxy.
 * `proxy`: the server holds the key (read from `.env`).
 * `needs-key`: no server key is available; the visitor must supply one.
 * `own-key`: using a visitor-supplied key held in memory.
 */
export type ChatMode = 'checking' | 'proxy' | 'needs-key' | 'own-key';

export interface ChatNotice {
  code: ChatErrorCode;
  /** True when the failure came from a visitor-supplied key rather than the server. */
  ownKey: boolean;
}

const proxyUrl = `${import.meta.env.BASE_URL}${chatConfig.proxyPath}`;

export function useVirtualKcChat() {
  const [mode, setMode] = useState<ChatMode>('checking');
  const [apiKey, setApiKey] = useState<string>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [notice, setNotice] = useState<ChatNotice | null>(null);
  /** Latest completed reply, for a screen-reader announcement once streaming ends. */
  const [announcement, setAnnouncement] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let cancelled = false;
    void isProxyAvailable(proxyUrl).then((available) => {
      if (!cancelled) setMode(available ? 'proxy' : 'needs-key');
    });
    return () => {
      cancelled = true;
      abortRef.current?.abort();
    };
  }, []);

  const run = useCallback(async (history: ChatMessage[], key: string | undefined) => {
    const controller = new AbortController();
    abortRef.current = controller;
    setIsStreaming(true);
    setNotice(null);
    setAnnouncement('');
    setMessages([...history, { role: 'assistant', content: '' }]);

    const appendToReply = (text: string) =>
      setMessages((current) => {
        const last = current.at(-1);
        if (last?.role !== 'assistant') return current;
        return [...current.slice(0, -1), { ...last, content: last.content + text }];
      });
    const dropEmptyReply = () =>
      setMessages((current) =>
        current.at(-1)?.role === 'assistant' && current.at(-1)?.content === ''
          ? current.slice(0, -1)
          : current,
      );

    try {
      const reply = await streamChat({
        messages: history.slice(-chatConfig.maxHistory),
        proxyUrl,
        apiKey: key,
        signal: controller.signal,
        onDelta: appendToReply,
      });
      if (reply) setAnnouncement(reply);
      else {
        dropEmptyReply();
        setNotice({ code: 'unavailable', ownKey: Boolean(key) });
      }
    } catch (error) {
      dropEmptyReply();
      if (controller.signal.aborted) return;
      const code = error instanceof ChatError ? error.code : 'unavailable';
      setNotice({ code, ownKey: Boolean(key) });
      if (code === 'invalid-key') {
        setApiKey(undefined);
        setMode('needs-key');
      }
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setIsStreaming(false);
    }
  }, []);

  const send = useCallback(
    (text: string) => {
      const content = text.trim().slice(0, chatConfig.maxMessageLength);
      if (!content || isStreaming || (mode !== 'proxy' && mode !== 'own-key')) return;
      const history = [...messages, { role: 'user' as const, content }];
      void run(history, apiKey);
    },
    [apiKey, isStreaming, messages, mode, run],
  );

  const stop = useCallback(() => abortRef.current?.abort(), []);

  /** Switches to a visitor-supplied key and answers any question that was left unanswered. */
  const submitKey = useCallback(
    async (key: string) => {
      setIsVerifying(true);
      setNotice(null);
      const result = await verifyApiKey(key);
      setIsVerifying(false);
      if (result !== 'ok') {
        setNotice({ code: result, ownKey: true });
        return;
      }
      setApiKey(key);
      setMode('own-key');
      setNotice(null);
      if (messages.at(-1)?.role === 'user') void run(messages, key);
    },
    [messages, run],
  );

  const forgetKey = useCallback(() => {
    abortRef.current?.abort();
    setApiKey(undefined);
    setMode('needs-key');
  }, []);

  return {
    mode,
    messages,
    isStreaming,
    isVerifying,
    notice,
    announcement,
    send,
    stop,
    submitKey,
    forgetKey,
  };
}
