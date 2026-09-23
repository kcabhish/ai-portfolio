import styles from './SkipLink.module.css';

export function SkipLink({ targetId }: { targetId: string }) {
  return (
    <a className={styles.skip} href={`#${targetId}`}>
      Skip to main content
    </a>
  );
}
