import { experience, profile } from '../data';
import { buildSystemPrompt } from './careerContext';

describe('buildSystemPrompt', () => {
  const prompt = buildSystemPrompt();

  it('grounds the assistant in the published career data', () => {
    expect(prompt).toContain(profile.name);
    for (const role of experience) {
      expect(prompt).toContain(role.company);
    }
  });

  it('instructs the model not to fabricate or share private contact details', () => {
    expect(prompt).toMatch(/never invent/i);
    expect(prompt).toMatch(/phone number, email address/i);
  });

  it('does not contain an email address or phone number', () => {
    expect(prompt).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
    expect(prompt).not.toMatch(/\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/);
  });
});
