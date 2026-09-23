import type { Profile } from '../../data/types';
import { SocialLinks } from '../contact/SocialLinks';
import styles from './SiteFooter.module.css';

export function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, and Vite.
        </p>
        <SocialLinks links={profile.social} variant="compact" />
      </div>
    </footer>
  );
}
