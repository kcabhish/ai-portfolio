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

  it('links every resume download to the PDF in public/', () => {
    render(<App />);
    const links = screen.getAllByRole('link', { name: /download resume/i });

    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute('href', `${import.meta.env.BASE_URL}${profile.resume.fileName}`);
      expect(link).toHaveAttribute('download', profile.resume.fileName);
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
