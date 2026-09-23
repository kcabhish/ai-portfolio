import styles from './TechList.module.css';

interface TechListProps {
  items: string[];
  label?: string;
}

export function TechList({ items, label = 'Technologies' }: TechListProps) {
  if (items.length === 0) return null;

  return (
    <ul className={styles.list} aria-label={label}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
