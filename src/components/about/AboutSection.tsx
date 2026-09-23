import type { Education, Profile } from '../../data/types';
import { Section } from '../common/Section';
import styles from './AboutSection.module.css';

interface AboutSectionProps {
  profile: Profile;
  education: Education[];
}

export function AboutSection({ profile, education }: AboutSectionProps) {
  const degree = education[0];

  return (
    <Section id="about" eyebrow="Professional summary" title="Engineering across the stack">
      <div className={styles.layout}>
        <div className={styles.summary}>
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <dl className={styles.glance}>
          {profile.highlights.map((highlight) => (
            <div key={highlight.label}>
              <dt>{highlight.label}</dt>
              <dd>{highlight.value}</dd>
            </div>
          ))}
          {degree ? (
            <div>
              <dt>Education</dt>
              <dd>B.S. Computer Science, {degree.institution}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </Section>
  );
}
