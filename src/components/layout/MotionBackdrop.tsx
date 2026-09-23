import styles from './MotionBackdrop.module.css';

/** Decorative, slowly drifting background. Purely visual, so it is hidden from assistive technology. */
export function MotionBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true" data-testid="motion-backdrop">
      <div className={styles.grid} />
      <div className={`${styles.blob} ${styles.blobOne}`} />
      <div className={`${styles.blob} ${styles.blobTwo}`} />
      <div className={`${styles.blob} ${styles.blobThree}`} />
    </div>
  );
}
