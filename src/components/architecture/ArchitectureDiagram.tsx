import type { ArchitectureDiagramData } from '../../data/types';
import styles from './ArchitectureDiagram.module.css';

export function ArchitectureDiagram({ diagram }: { diagram: ArchitectureDiagramData }) {
  const titleId = `diagram-${diagram.id}-title`;

  return (
    <figure className={styles.figure} aria-labelledby={titleId}>
      <p id={titleId} className={styles.title}>
        {diagram.title}
      </p>
      <ol className={styles.steps}>
        {diagram.steps.map((step) => (
          <li key={step.label} className={styles.step}>
            <span className={styles.label}>{step.label}</span>
            <span className={styles.detail}>{step.detail}</span>
          </li>
        ))}
      </ol>
      <figcaption className={styles.caption}>{diagram.caption}</figcaption>
    </figure>
  );
}
