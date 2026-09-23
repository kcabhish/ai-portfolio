import type { SocialLink } from '../../data/types';
import { ExternalLink } from '../common/ExternalLink';
import styles from './SocialLinks.module.css';

interface SocialLinksProps {
  links: SocialLink[];
  variant?: 'compact' | 'detailed';
}

function SocialIcon({ id }: { id: SocialLink['id'] }) {
  const path =
    id === 'linkedin'
      ? 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z'
      : 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z';

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}

export function SocialLinks({ links, variant = 'detailed' }: SocialLinksProps) {
  return (
    <ul className={`${styles.list} ${styles[variant]}`}>
      {links.map((link) => (
        <li key={link.id}>
          <ExternalLink className={styles.link} href={link.href}>
            <SocialIcon id={link.id} />
            <span className={styles.label}>
              {link.label}
              <span className="visually-hidden"> profile</span>
            </span>
            {variant === 'detailed' ? <span className={styles.handle}>{link.display}</span> : null}
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}
