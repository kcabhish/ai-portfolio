import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { chatConfig } from '../../chat/config';
import { ApiKeyForm } from './ApiKeyForm';
import { useVirtualKcChat, type ChatNotice } from './useVirtualKcChat';
import styles from './VirtualKc.module.css';

interface VirtualKcPanelProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const suggestions = [
  'What do you work on at CACI?',
  'What AI engineering have you done?',
  'Tell me about the micro-frontend work at Expedia.',
  'Which technologies do you use most?',
];

function noticeText({ code, ownKey }: ChatNotice): string {
  switch (code) {
    case 'invalid-key':
      return ownKey
        ? 'OpenAI rejected that key. Check it and try again.'
        : 'The server’s OpenAI key was rejected, so I need a key from you to continue.';
    case 'rate-limited':
      return 'OpenAI is limiting requests right now, or the key is out of quota. Try again in a moment.';
    case 'bad-request':
      return 'That message could not be sent. Try rephrasing it.';
    case 'unavailable':
      return 'I could not reach OpenAI just now. Try again in a moment.';
  }
}

export function VirtualKcPanel({ id, isOpen, onClose }: VirtualKcPanelProps) {
  const chat = useVirtualKcChat();
  const [draft, setDraft] = useState('');
  const panelRef = useRef<HTMLElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const inputId = useId();
  const canChat = chat.mode === 'proxy' || chat.mode === 'own-key';

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // Move focus into whichever form is showing when the panel opens or the mode changes.
  useEffect(() => {
    if (!isOpen || chat.mode === 'checking') return;
    panelRef.current?.querySelector<HTMLElement>('textarea, input')?.focus();
  }, [isOpen, chat.mode]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [chat.messages, chat.notice, chat.mode]);

  const submit = (text: string) => {
    if (!text.trim() || chat.isStreaming) return;
    chat.send(text);
    setDraft('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(draft);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit(draft);
    }
  };

  return (
    <section
      ref={panelRef}
      id={id}
      className={styles.panel}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      hidden={!isOpen}
    >
      <header className={styles.panelHeader}>
        <div>
          <h2 id={titleId} className={styles.title}>
            {chatConfig.assistantName}
          </h2>
          <p className={styles.subtitle}>AI assistant · answers from my resume</p>
        </div>
        <button type="button" className={styles.iconButton} onClick={onClose}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <span className="visually-hidden">Close chat</span>
        </button>
      </header>

      <div ref={logRef} className={styles.log}>
        <ol className={styles.messages}>
          <li className={styles.assistant}>
            <span className="visually-hidden">{chatConfig.assistantName}: </span>
            Hi, I’m {chatConfig.assistantName}, an AI version of Abhishek. Ask me about my
            experience, projects, or skills.
          </li>
          {chat.messages.map((message, index) => (
            <li key={index} className={message.role === 'user' ? styles.user : styles.assistant}>
              <span className="visually-hidden">
                {message.role === 'user' ? 'You' : chatConfig.assistantName}:{' '}
              </span>
              {message.content || (
                <span className={styles.typing}>
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span className="visually-hidden">Thinking</span>
                </span>
              )}
            </li>
          ))}
        </ol>

        {chat.notice && (
          <p className={styles.notice} role="alert">
            {noticeText(chat.notice)}
          </p>
        )}

        {chat.mode === 'needs-key' && !chat.notice && (
          <p className={styles.notice}>
            I couldn’t find an OpenAI API key on the server, so I can’t answer yet. Paste an OpenAI
            API key below to start chatting.
          </p>
        )}

        {canChat && chat.messages.length === 0 && (
          <ul className={styles.suggestions} aria-label="Suggested questions">
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  className={styles.suggestion}
                  onClick={() => submit(suggestion)}
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.composer}>
        {chat.mode === 'checking' && <p className={styles.hint}>Connecting…</p>}

        {chat.mode === 'needs-key' && (
          <ApiKeyForm onSubmit={chat.submitKey} isVerifying={chat.isVerifying} />
        )}

        {canChat && (
          <form className={styles.messageForm} onSubmit={handleSubmit}>
            <label htmlFor={inputId} className="visually-hidden">
              Ask {chatConfig.assistantName} about Abhishek’s career
            </label>
            <textarea
              id={inputId}
              className={styles.textarea}
              rows={2}
              maxLength={chatConfig.maxMessageLength}
              placeholder="Ask about my experience, projects, or skills"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            {chat.isStreaming ? (
              <button type="button" className={styles.secondaryButton} onClick={chat.stop}>
                Stop
              </button>
            ) : (
              <button type="submit" className={styles.primaryButton} disabled={!draft.trim()}>
                Send
              </button>
            )}
          </form>
        )}

        <p className={styles.disclaimer}>
          AI-generated and can be wrong. Confirm details with me on LinkedIn.
          {chat.mode === 'own-key' && (
            <>
              {' '}
              <button type="button" className={styles.textButton} onClick={chat.forgetKey}>
                Forget my key
              </button>
            </>
          )}
        </p>
      </div>

      <p className="visually-hidden" role="status">
        {chat.isStreaming ? `${chatConfig.assistantName} is responding` : chat.announcement}
      </p>
    </section>
  );
}
