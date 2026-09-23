import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  title: string;
  eyebrow?: string;
  intro?: ReactNode;
  children: ReactNode;
  tone?: 'default' | 'muted';
}

export function Section({ id, title, eyebrow, intro, children, tone = 'default' }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={tone === 'muted' ? `${styles.section} ${styles.muted}` : styles.section}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h2 id={headingId} className={styles.title}>
            {title}
          </h2>
          {intro ? <div className={styles.intro}>{intro}</div> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
