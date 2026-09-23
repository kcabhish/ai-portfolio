import type { Experience } from '../../data/types';
import { formatDateRange } from '../../utils/formatDate';
import { TechList } from '../common/TechList';
import styles from './ExperienceCard.module.css';

export function ExperienceCard({ role }: { role: Experience }) {
  const headingId = `experience-${role.id}`;

  return (
    <article className={styles.card} aria-labelledby={headingId}>
      <header className={styles.header}>
        <h3 id={headingId} className={styles.role}>
          {role.role}
          <span className={styles.company}>{role.company}</span>
        </h3>
        <p className={styles.dates}>
          <time dateTime={role.startDate}>{formatDateRange(role.startDate, role.endDate)}</time>
        </p>
      </header>

      {role.summary ? <p className={styles.summary}>{role.summary}</p> : null}

      <ul className={styles.accomplishments}>
        {role.accomplishments.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {role.engagements?.length ? (
        <div className={styles.engagements}>
          <h4 className={styles.engagementsTitle}>Client engagements</h4>
          <ul className={styles.engagementList}>
            {role.engagements.map((engagement) => (
              <li key={engagement.client} className={styles.engagement}>
                <p className={styles.client}>
                  {engagement.client}
                  {engagement.startDate ? (
                    <span className={styles.clientDates}>
                      {formatDateRange(engagement.startDate, engagement.endDate)}
                    </span>
                  ) : null}
                </p>
                <ul className={styles.accomplishments}>
                  {engagement.accomplishments.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <TechList
                  items={engagement.technologies}
                  label={`Technologies used at ${engagement.client}`}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <TechList items={role.technologies} label={`Technologies used at ${role.company}`} />
    </article>
  );
}
