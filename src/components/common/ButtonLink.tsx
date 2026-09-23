import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './ButtonLink.module.css';

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

/** A link styled as a button. Use a real `<button>` for actions that do not navigate. */
export function ButtonLink({ variant = 'primary', className, children, ...rest }: ButtonLinkProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  );
}
