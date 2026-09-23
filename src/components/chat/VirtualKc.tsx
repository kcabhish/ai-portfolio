import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { chatConfig } from '../../chat/config';
import styles from './VirtualKc.module.css';

const loadPanel = () => import('./VirtualKcPanel');
const VirtualKcPanel = lazy(() =>
  loadPanel().then((module) => ({ default: module.VirtualKcPanel })),
);

const PANEL_ID = 'virtual-kc';

/** Floating launcher; the chat panel is code-split and only downloaded when first needed. */
export function VirtualKc() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);

  const close = useCallback(() => {
    returnFocus.current = true;
    setIsOpen(false);
  }, []);

  // The launcher is hidden while the panel is open, so focus it only after it reappears.
  useEffect(() => {
    if (!isOpen && returnFocus.current) {
      returnFocus.current = false;
      launcherRef.current?.focus();
    }
  }, [isOpen]);

  const prefetch = () => void loadPanel();

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={styles.launcher}
        aria-expanded={isOpen}
        aria-controls={hasOpened ? PANEL_ID : undefined}
        hidden={isOpen}
        onClick={() => {
          setHasOpened(true);
          setIsOpen(true);
        }}
        onPointerEnter={prefetch}
        onFocus={prefetch}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            d="M4 5h16v11H9l-5 4V5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        Ask {chatConfig.assistantName}
      </button>

      {hasOpened && (
        <Suspense fallback={null}>
          <VirtualKcPanel id={PANEL_ID} isOpen={isOpen} onClose={close} />
        </Suspense>
      )}
    </>
  );
}
