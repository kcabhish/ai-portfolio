import { site } from './site';
import type { Profile } from './types';

const resumeFileName = 'Abhishek_KC_Resume_2026.pdf';

export const profile: Profile = {
  name: site.name,
  headline: ['Senior Software Engineer', 'Front-End Architect', 'Full-Stack & AI Engineer'],
  tagline:
    'I design and build scalable web applications, reusable frontend architecture, and AI-enabled features for enterprise teams, treating accessibility and performance as engineering requirements.',
  summary: [
    'I am a senior software engineer who has been building for the web professionally since 2014, across government, travel, finance, e-commerce, and consulting environments.',
    'Most of my work sits where frontend architecture meets the rest of the system: reusable and accessible React and Angular components, micro-frontend integration, analytics instrumentation, CI/CD pipelines, and backend integration with Node.js and Express.',
    'More recently I have been applying that engineering discipline to AI systems: evaluating large language models for product fit, building full-stack transcription and translation services with OpenAI Whisper, and building interfaces that support generative and agentic AI work.',
  ],
  social: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: site.linkedin,
      display: 'in/akc-a30918125',
    },
    {
      id: 'github',
      label: 'GitHub',
      href: site.github,
      display: 'kcabhish',
    },
  ],
  resume: {
    href: `${import.meta.env.BASE_URL}${resumeFileName}`,
    fileName: resumeFileName,
  },
};
