export interface NavItem {
  /** Matches the `id` of the target section. */
  id: string;
  label: string;
}

/** Main sections, used by the mobile header menu. */
export const navigation: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'ai', label: 'AI' },
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'contact', label: 'Contact' },
];

/** Every section in page order, used by the tablet and desktop section rail. */
export const sectionNavigation: NavItem[] = [
  { id: 'top', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Selected work' },
  { id: 'ai', label: 'AI engineering' },
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'education', label: 'Awards & education' },
  { id: 'open-source', label: 'Open source' },
  { id: 'contact', label: 'Contact' },
];
