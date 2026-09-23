import type { PersonalProject } from '../../data/types';
import { ExternalLink } from '../common/ExternalLink';
import { Section } from '../common/Section';
import { TechList } from '../common/TechList';
import styles from './OpenSourceSection.module.css';

interface OpenSourceSectionProps {
  projects: PersonalProject[];
  githubUrl: string;
}

export function OpenSourceSection({ projects, githubUrl }: OpenSourceSectionProps) {
  return (
    <Section
      id="open-source"
      eyebrow="Personal & open source"
      title="Outside of client and employer work"
      tone="muted"
      intro={
        <p>
          Personal and experimental projects are kept separate from professional experience. They
          live on GitHub.
        </p>
      }
    >
      {projects.length > 0 ? (
        <ul className={styles.grid}>
          {projects.map((project) => (
            <li key={project.name} className={styles.card}>
              <h3 className={styles.title}>
                <ExternalLink href={project.href}>{project.name}</ExternalLink>
              </h3>
              <p className={styles.description}>{project.description}</p>
              <TechList
                items={project.technologies}
                label={`Technologies used in ${project.name}`}
              />
            </li>
          ))}
        </ul>
      ) : null}

      <p className={styles.cta}>
        <ExternalLink className={styles.ctaLink} href={githubUrl}>
          Browse repositories on GitHub
        </ExternalLink>
      </p>
    </Section>
  );
}
