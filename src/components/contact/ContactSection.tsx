import type { Profile } from '../../data/types';
import { Section } from '../common/Section';
import { SocialLinks } from './SocialLinks';
import styles from './ContactSection.module.css';

export function ContactSection({ profile }: { profile: Profile }) {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s connect"
      intro={
        <p>
          The best way to reach me is a message on LinkedIn. You can also browse my code on GitHub.
        </p>
      }
    >
      <div className={styles.actions}>
        <SocialLinks links={profile.social} />
        {/* <ButtonLink
          href={profile.resume.href}
          download={profile.resume.fileName}
          variant="secondary"
        >
          Download resume
          <span className="visually-hidden"> (PDF)</span>
        </ButtonLink> */}
      </div>
    </Section>
  );
}
