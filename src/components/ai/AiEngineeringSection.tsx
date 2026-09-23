import type { AiExperience } from '../../data/types';
import { Section } from '../common/Section';
import { TechList } from '../common/TechList';
import styles from './AiEngineeringSection.module.css';

export function AiEngineeringSection({ items }: { items: AiExperience[] }) {
  return (
    <Section
      id="ai"
      eyebrow="Full-stack AI engineering"
      title="AI features, engineered end to end"
      tone="muted"
      intro={
        <p>
          Everything listed here is professional work. The model is one component of the system; the
          engineering is in evaluating it for fit, integrating it, and owning the services,
          interfaces, and compatibility around it.
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
