import type { ArchitectureDiagramData, FeaturedWork } from '../../data/types';
import { ArchitectureDiagram } from '../architecture/ArchitectureDiagram';
import { TechList } from '../common/TechList';
import styles from './WorkCard.module.css';

interface WorkCardProps {
  work: FeaturedWork;
  diagram?: ArchitectureDiagramData | undefined;
}

export function WorkCard({ work, diagram }: WorkCardProps) {
  const headingId = `work-${work.id}`;

  return (
    <article
      className={diagram ? `${styles.card} ${styles.wide}` : styles.card}
      aria-labelledby={headingId}
    >
      <div className={styles.body}>
        <p className={styles.context}>{work.context}</p>
        <h3 id={headingId} className={styles.title}>
          {work.title}
        </h3>

        <dl className={styles.details}>
          <div>
            <dt>Problem</dt>
            <dd>{work.problem}</dd>
          </div>
          <div>
            <dt>What I built</dt>
            <dd>{work.built}</dd>
          </div>
          <div>
            <dt>Key decisions</dt>
            <dd>
              <ul className={styles.decisions}>
                {work.decisions.map((decision) => (
                  <li key={decision}>{decision}</li>
                ))}
              </ul>
            </dd>
          </div>
          {work.outcome ? (
            <div>
              <dt>Outcome</dt>
              <dd>{work.outcome}</dd>
            </div>
          ) : null}
        </dl>

        <TechList items={work.technologies} label={`Technologies used in ${work.title}`} />
      </div>

      {diagram ? <ArchitectureDiagram diagram={diagram} /> : null}
    </article>
  );
}
