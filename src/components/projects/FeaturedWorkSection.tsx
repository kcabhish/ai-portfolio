import type { ArchitectureDiagramData, DiagramId, FeaturedWork } from '../../data/types';
import { Section } from '../common/Section';
import { WorkCard } from './WorkCard';
import styles from './FeaturedWorkSection.module.css';

interface FeaturedWorkSectionProps {
  work: FeaturedWork[];
  diagrams: Record<DiagramId, ArchitectureDiagramData>;
}

export function FeaturedWorkSection({ work, diagrams }: FeaturedWorkSectionProps) {
  return (
    <Section
      id="work"
      eyebrow="Featured engineering work"
      title="Selected work"
      intro={
        <p>
          Engineering stories grouped from professional roles. Employer systems are described at a
          high level, and diagrams show generalized patterns rather than internal architecture.
        </p>
      }
    >
      <div className={styles.grid}>
        {work.map((item) => (
          <WorkCard
            key={item.id}
            work={item}
            diagram={item.diagram ? diagrams[item.diagram] : undefined}
          />
        ))}
      </div>
    </Section>
  );
}
