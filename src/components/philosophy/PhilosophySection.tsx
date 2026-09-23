import type { Principle } from '../../data/types';
import { Section } from '../common/Section';
import styles from './PhilosophySection.module.css';

export function PhilosophySection({ principles }: { principles: Principle[] }) {
  return (
    <Section
      id="philosophy"
      eyebrow="Engineering philosophy"
      title="How I approach the work"
      tone="muted"
    >
      <ol className={styles.list}>
        {principles.map((principle) => (
          <li key={principle.title} className={styles.item}>
            <h3 className={styles.title}>{principle.title}</h3>
            <p>{principle.description}</p>
            <p className={styles.evidence}>
              <span className={styles.evidenceLabel}>In practice:</span> {principle.evidence}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
