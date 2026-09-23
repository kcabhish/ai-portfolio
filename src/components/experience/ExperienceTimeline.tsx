import { useId, useState } from 'react';
import type { Experience } from '../../data/types';
import { ExperienceCard } from './ExperienceCard';
import styles from './ExperienceTimeline.module.css';

export function ExperienceTimeline({ roles }: { roles: Experience[] }) {
  const [showEarlier, setShowEarlier] = useState(false);
  const earlierListId = useId();

  const recent = roles.filter((role) => !role.isEarlier);
  const earlier = roles.filter((role) => role.isEarlier);

  return (
    <div className={styles.timeline}>
      <ol className={styles.list}>
        {recent.map((role) => (
          <li key={role.id} className={styles.item}>
            <ExperienceCard role={role} />
          </li>
        ))}
      </ol>

      {earlier.length > 0 ? (
        <>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={showEarlier}
            aria-controls={earlierListId}
            onClick={() => setShowEarlier((value) => !value)}
          >
            {showEarlier ? 'Hide earlier roles' : `Show earlier roles (${earlier.length})`}
          </button>

          <ol id={earlierListId} className={styles.list} hidden={!showEarlier}>
            {earlier.map((role) => (
              <li key={role.id} className={styles.item}>
                <ExperienceCard role={role} />
              </li>
            ))}
          </ol>
        </>
      ) : null}
    </div>
  );
}
