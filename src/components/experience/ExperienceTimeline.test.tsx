import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { experience } from '../../data';
import { ExperienceTimeline } from './ExperienceTimeline';

const recent = experience.filter((role) => !role.isEarlier);
const earlier = experience.filter((role) => role.isEarlier);

describe('ExperienceTimeline', () => {
  it('renders recent roles from the data files', () => {
    render(<ExperienceTimeline roles={experience} />);

    for (const role of recent) {
      expect(screen.getByRole('article', { name: new RegExp(role.company) })).toBeVisible();
    }
  });

  it('shows the current role as present', () => {
    render(<ExperienceTimeline roles={experience} />);
    expect(screen.getByText(/Sep 2025 – Present/)).toBeInTheDocument();
  });

  it('reveals earlier roles on demand', async () => {
    const user = userEvent.setup();
    render(<ExperienceTimeline roles={experience} />);
    const toggle = screen.getByRole('button', { name: /show earlier roles/i });
    const firstEarlier = earlier[0];
    if (!firstEarlier) throw new Error('Expected at least one earlier role in the data.');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('article', { name: new RegExp(firstEarlier.company) })).toBeNull();

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAccessibleName(/hide earlier roles/i);
    for (const role of earlier) {
      expect(screen.getByRole('article', { name: new RegExp(role.company) })).toBeVisible();
    }
  });
});
