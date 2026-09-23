import { useEffect, useRef, useState } from 'react';
import type { NavItem } from '../../data/navigation';
import { ThemeToggle } from './ThemeToggle';
import styles from './SiteHeader.module.css';

interface SiteHeaderProps {
  name: string;
  items: NavItem[];
}

/** Width at which the section rail takes over. Keep in sync with the CSS breakpoints. */
export const RAIL_QUERY = '(width >= 48rem)';

export function SiteHeader({ name, items }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia(RAIL_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top">
          {name}
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className={styles.menuIcon} aria-hidden="true" data-open={isOpen} />
            Menu
          </button>

          <ul id="primary-navigation" className={styles.list} data-open={isOpen}>
            {items.map((item) => (
              <li key={item.id}>
                <a className={styles.link} href={`#${item.id}`} onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
