import { render, screen, within } from '@testing-library/react';
import { App } from './App';
import { profile } from './data';

describe('App', () => {
  it('has a single h1 with the engineer’s name', () => {
    render(<App />);
    const headings = screen.getAllByRole('heading', { level: 1 });

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(profile.name);
  });

  it('hides the decorative motion background from assistive technology', () => {
    render(<App />);
    expect(screen.getByTestId('motion-backdrop')).toHaveAttribute('aria-hidden', 'true');
  });

  it('offers a skip link to the main content', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main',
    );
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
  });

  it('does not link to the resume PDF while downloads are disabled', () => {
    render(<App />);

    expect(screen.queryByRole('link', { name: /download resume/i })).toBeNull();
    expect(document.body.innerHTML).not.toContain(profile.resume.fileName);
  });

  it('offers a tablet and desktop section rail covering every nav target', () => {
    render(<App />);
    const rail = screen.getByRole('navigation', { name: 'On this page' });
    const railTargets = within(rail)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'));

    for (const link of within(screen.getByRole('navigation', { name: 'Primary' })).getAllByRole(
      'link',
    )) {
      expect(railTargets).toContain(link.getAttribute('href'));
    }
    for (const href of railTargets) {
      expect(document.getElementById(href?.slice(1) ?? '')).not.toBeNull();
    }
  });

  it('opens external links safely and announces the new tab', () => {
    render(<App />);
    const external = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('http'));

    expect(external.length).toBeGreaterThan(0);
    for (const link of external) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAccessibleName(/opens in a new tab/);
    }
  });

  it('labels social profile links and only publishes LinkedIn and GitHub', () => {
    render(<App />);
    const contact = screen.getByRole('region', { name: /let’s connect/i });

    expect(within(contact).getByRole('link', { name: /linkedin\s*profile/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/akc-a30918125',
    );
    expect(within(contact).getByRole('link', { name: /github\s*profile/i })).toHaveAttribute(
      'href',
      'https://github.com/kcabhish',
    );
    expect(document.body.innerHTML).not.toMatch(/mailto:|tel:|kcabhish@gmail|345-1499/);
  });

  it('gives every section an accessible name that nav links can target', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: 'Primary' });

    for (const link of within(nav).getAllByRole('link')) {
      const id = link.getAttribute('href')?.slice(1) ?? '';
      const target = document.getElementById(id);
      expect(target, `missing section #${id}`).not.toBeNull();
      expect(target).toHaveAttribute('aria-labelledby');
    }
  });
});
