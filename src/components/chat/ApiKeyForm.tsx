import { useId, useState, type FormEvent } from 'react';
import { ExternalLink } from '../common/ExternalLink';
import styles from './VirtualKc.module.css';

interface ApiKeyFormProps {
  onSubmit: (key: string) => Promise<void>;
  isVerifying: boolean;
}

const KEY_PATTERN = /^sk-[A-Za-z0-9_-]{20,}$/;

export function ApiKeyForm({ onSubmit, isVerifying }: ApiKeyFormProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputId = useId();
  const hintId = useId();
  const errorId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const key = value.trim();
    if (isVerifying) return;
    if (!KEY_PATTERN.test(key)) {
      setError('Enter a valid OpenAI API key. It starts with "sk-".');
      return;
    }
    setError('');
    setValue('');
    void onSubmit(key);
  };

  return (
    <form className={styles.keyForm} onSubmit={handleSubmit} noValidate>
      <label className={styles.keyLabel} htmlFor={inputId}>
        OpenAI API key
      </label>
      <p id={hintId} className={styles.hint}>
        Sent only from your browser to OpenAI and kept in memory until you reload the page. It is
        never saved.
      </p>
      <div className={styles.row}>
        <input
          id={inputId}
          className={styles.input}
          type="password"
          autoComplete="off"
          spellCheck={false}
          placeholder="sk-…"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${hintId} ${errorId}` : hintId}
        />
        <button type="submit" className={styles.primaryButton} disabled={isVerifying}>
          {isVerifying ? 'Checking…' : 'Use key'}
        </button>
      </div>
      {error && (
        <p id={errorId} className={styles.fieldError}>
          {error}
        </p>
      )}
      <details className={styles.keyHelp}>
        <summary>How do I get an OpenAI API key?</summary>
        <ol>
          <li>
            Sign in or create an account at{' '}
            <ExternalLink href="https://platform.openai.com/api-keys">
              platform.openai.com/api-keys
            </ExternalLink>
            .
          </li>
          <li>
            Select <strong>Create new secret key</strong>, give it a name, and copy it. OpenAI only
            shows the full key once.
          </li>
          <li>
            Add a small amount of credit under <strong>Billing</strong> in your account settings;
            the API does not work without it.
          </li>
          <li>Paste the key above and select Use key.</li>
        </ol>
        <p>
          Tip: set a monthly usage limit in your OpenAI settings, and delete the key when you no
          longer need it.
        </p>
      </details>
    </form>
  );
}
