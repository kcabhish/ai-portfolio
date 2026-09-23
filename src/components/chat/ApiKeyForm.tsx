import { useId, useState, type FormEvent } from 'react';
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
    </form>
  );
}
