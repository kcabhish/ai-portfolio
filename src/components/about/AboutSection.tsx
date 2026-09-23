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
          <div>
            <dt>Building for the web since</dt>
            <dd>2014</dd>
          </div>
          <div>
            <dt>Core stack</dt>
            <dd>React, Angular, TypeScript, Node.js</dd>
          </div>
          <div>
            <dt>Industries</dt>
            <dd>Government, travel, finance, e-commerce</dd>
          </div>
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
