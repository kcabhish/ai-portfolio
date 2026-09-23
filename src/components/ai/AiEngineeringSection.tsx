import type { AiExperience } from '../../data/types';
import { Section } from '../common/Section';
import { TechList } from '../common/TechList';
import styles from './AiEngineeringSection.module.css';

export function AiEngineeringSection({ items }: { items: AiExperience[] }) {
  return (
    <Section
      id="ai"
      eyebrow="AI engineering"
      title="Software engineering applied to AI systems"
      tone="muted"
      intro={
        <p>
          Everything listed here is professional work: integrating models into real products,
          evaluating them for fit, and building the interfaces and adaptors around them.
        </p>
      }
    >
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.id} className={styles.card}>
            <p className={styles.context}>
              <span className={styles.badge}>Professional</span>
              {item.context}
            </p>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
            <TechList items={item.technologies} label={`Technologies used in ${item.title}`} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
