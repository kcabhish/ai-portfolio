import type { Experience, Profile } from '../../data/types';
import { ButtonLink } from '../common/ButtonLink';
import styles from './Hero.module.css';

interface HeroProps {
  profile: Profile;
  experience: Experience[];
}

export function Hero({ profile, experience }: HeroProps) {
  const [current, ...previous] = experience;
  const previousCompanies = previous
    .filter((role) => !role.isEarlier)
    .map((role) => role.company)
    .join(', ');

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.inner}>
        <h1 id="hero-heading" className={styles.name}>
          {profile.name}
        </h1>
        <p className={styles.headline}>
          {profile.headline.map((role, index) => (
            <span key={role}>
              {role}
              {index < profile.headline.length - 1 ? (
                <span className={styles.separator} aria-hidden="true">
                  {' '}
                  /{' '}
                </span>
              ) : null}
            </span>
          ))}
        </p>
        <p className={styles.tagline}>{profile.tagline}</p>

        <div className={styles.actions}>
          <ButtonLink href="#work">View my work</ButtonLink>
          {/* <ButtonLink
            href={profile.resume.href}
            download={profile.resume.fileName}
            variant="secondary"
          >
            Download resume
            <span className="visually-hidden"> (PDF)</span>
          </ButtonLink> */}
          <ButtonLink href="#contact" variant="secondary">
            Let’s connect
          </ButtonLink>
        </div>

        {current ? (
          <dl className={styles.facts}>
            <div>
              <dt>Currently</dt>
              <dd>
                {current.role}, {current.company}
              </dd>
            </div>
            {previousCompanies ? (
              <div>
                <dt>Previously</dt>
                <dd>{previousCompanies}</dd>
              </div>
            ) : null}
            <div>
              <dt>Focus</dt>
              <dd>{profile.focus}</dd>
            </div>
          </dl>
        ) : null}
      </div>
    </section>
  );
}
