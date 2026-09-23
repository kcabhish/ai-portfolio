import type { Award, Education } from '../../data/types';
import { formatYearMonth } from '../../utils/formatDate';
import { Section } from '../common/Section';
import styles from './RecognitionSection.module.css';

interface RecognitionSectionProps {
  awards: Award[];
  education: Education[];
}

export function RecognitionSection({ awards, education }: RecognitionSectionProps) {
  return (
    <Section id="education" eyebrow="Recognition & education" title="Awards and education">
      <div className={styles.layout}>
        <div className={styles.column}>
          <h3 className={styles.heading}>Awards</h3>
          <ul className={styles.list}>
            {awards.map((award) => (
              <li key={`${award.name}-${award.date}`} className={styles.item}>
                <p className={styles.name}>{award.name}</p>
                <p className={styles.meta}>
                  {award.organization}, {award.date}
                </p>
                <p className={styles.reason}>{award.reason}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.heading}>Education</h3>
          <ul className={styles.list}>
            {education.map((entry) => (
              <li key={entry.degree} className={styles.item}>
                <p className={styles.name}>{entry.degree}</p>
                <p className={styles.meta}>
                  {entry.institution}, {entry.location}
                </p>
                <p className={styles.reason}>
                  Graduated{' '}
                  <time dateTime={entry.graduationDate}>
                    {formatYearMonth(entry.graduationDate)}
                  </time>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
