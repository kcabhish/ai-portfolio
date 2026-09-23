import { act, render, screen, within } from '@testing-library/react';
import { sectionNavigation } from '../../data/navigation';
import { SectionRail } from './SectionRail';

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

let observerCallback: ObserverCallback | undefined;

class MockIntersectionObserver {
  constructor(callback: ObserverCallback) {
    observerCallback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

function renderWithSections() {
  for (const item of sectionNavigation) {
    const section = document.createElement('section');
    section.id = item.id;
    document.body.append(section);
  }
  render(<SectionRail items={sectionNavigation} />);
  return screen.getByRole('navigation', { name: 'On this page' });
}

function intersect(id: string, isIntersecting: boolean) {
  const target = document.getElementById(id);
  if (!target) throw new Error(`Missing section #${id}`);
  act(() => observerCallback?.([{ target, isIntersecting }]));
}

describe('SectionRail', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    observerCallback = undefined;
    document.querySelectorAll('section').forEach((section) => section.remove());
  });

  it('links to every section in page order', () => {
    const nav = renderWithSections();
    const links = within(nav).getAllByRole('link');

    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      sectionNavigation.map((item) => `#${item.id}`),
    );
  });

  it('marks the first section as current before any scrolling', () => {
    const nav = renderWithSections();
    const first = sectionNavigation[0];
    if (!first) throw new Error('Expected at least one section.');

    expect(within(nav).getByRole('link', { name: first.label })).toHaveAttribute(
      'aria-current',
      'location',
    );
  });

  it('moves the current marker as sections scroll into view', () => {
    const nav = renderWithSections();

    intersect('top', false);
    intersect('experience', true);

    expect(within(nav).getByRole('link', { name: 'Experience' })).toHaveAttribute(
      'aria-current',
      'location',
    );
    expect(within(nav).getByRole('link', { name: 'Intro' })).not.toHaveAttribute('aria-current');
  });
});
