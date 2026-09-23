import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface ExternalLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'target' | 'rel'
> {
  href: string;
  children: ReactNode;
}

export function ExternalLink({ children, ...rest }: ExternalLinkProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
