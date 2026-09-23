import { useMemo } from 'react';
import type { NavItem } from '../../data/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './SectionRail.module.css';

export function SectionRail({ items }: { items: NavItem[] }) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const active = useActiveSection(ids);

  return (
    <nav className={styles.rail} aria-labelledby="section-rail-title">
      <p id="section-rail-title" className={styles.title}>
        On this page
      </p>
      <div className={styles.track}>
        <span className={styles.progress} aria-hidden="true" />
        <ol className={styles.list}>
          {items.map((item) => (
            <li key={item.id}>
              <a
                className={styles.link}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
