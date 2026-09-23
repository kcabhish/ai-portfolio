import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { navigation } from '../../data/navigation';
import { setMediaQuery } from '../../test/matchMedia';
import { RAIL_QUERY, SiteHeader } from './SiteHeader';

function renderHeader() {
  render(<SiteHeader name="Abhishek KC" items={navigation} />);
  return {
    menuButton: screen.getByRole('button', { name: 'Menu' }),
    nav: screen.getByRole('navigation', { name: 'Primary' }),
  };
}

describe('SiteHeader', () => {
  it('renders a link for every section', () => {
    const { nav } = renderHeader();

    for (const item of navigation) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute(
        'href',
        `#${item.id}`,
      );
    }
  });

  it('toggles the mobile menu and reports its state', async () => {
    const user = userEvent.setup();
    const { menuButton } = renderHeader();

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on Escape and returns focus to the menu button', async () => {
    const user = userEvent.setup();
    const { menuButton } = renderHeader();

    await user.click(menuButton);
    await user.tab();
    await user.keyboard('{Escape}');

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveFocus();
  });

  it('closes after a navigation link is chosen', async () => {
    const user = userEvent.setup();
    const { menuButton, nav } = renderHeader();

    await user.click(menuButton);
    await user.click(within(nav).getByRole('link', { name: 'Experience' }));

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes when the viewport grows to the section rail layout', async () => {
    const user = userEvent.setup();
    const { menuButton } = renderHeader();

    await user.click(menuButton);
    act(() => setMediaQuery(RAIL_QUERY, true));

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
