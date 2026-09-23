export interface NavItem {
  /** Matches the `id` of the target section. */
  id: string;
  label: string;
}

export const navigation: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'ai', label: 'AI' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'contact', label: 'Contact' },
];
