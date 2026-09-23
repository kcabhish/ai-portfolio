import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { THEME_STORAGE_KEY } from '../../hooks/useTheme';
import { setMediaQuery } from '../../test/matchMedia';
import { ThemeToggle } from './ThemeToggle';

const DARK_QUERY = '(prefers-color-scheme: dark)';

describe('ThemeToggle', () => {
  it('follows the system preference by default', () => {
    setMediaQuery(DARK_QUERY, true);
    render(<ThemeToggle />);

    expect(screen.getByRole('button', { name: /color theme: system/i })).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('reacts to system preference changes while in system mode', () => {
    render(<ThemeToggle />);
    expect(document.documentElement.dataset.theme).toBe('light');

    act(() => setMediaQuery(DARK_QUERY, true));
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('cycles system, light, dark and persists explicit choices', async () => {
    const user = userEvent.setup();
    setMediaQuery(DARK_QUERY, true);
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /color theme/i });

    await user.click(button);
    expect(button).toHaveAccessibleName(/color theme: light/i);
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');

    await user.click(button);
    expect(button).toHaveAccessibleName(/color theme: dark/i);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    await user.click(button);
    expect(button).toHaveAccessibleName(/color theme: system/i);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it('restores a saved preference', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    render(<ThemeToggle />);

    expect(screen.getByRole('button', { name: /color theme: dark/i })).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
