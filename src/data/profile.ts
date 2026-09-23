import { site } from './site.ts';
import type { Profile } from './types.ts';

const resumeFileName = 'Abhishek_KC_Resume_2026.pdf';

export const profile: Profile = {
  name: site.name,
  headline: ['Senior Software Engineer', 'Full-Stack AI Engineer', 'Front-End Architect'],
  tagline:
    'I build AI features end to end: integrating speech and language models into real products, and engineering the services, interfaces, and delivery pipelines around them with accessibility and performance treated as requirements.',
  focus: 'Full-stack AI features, LLM and speech integration, frontend architecture, accessibility',
  summary: [
    'I am a senior software engineer who has been building for the web since 2010, starting as a university web developer, across government, travel, finance, e-commerce, and consulting environments.',
    'My recent work applies full-stack engineering to AI systems. At CACI I build transcription and translation services on OpenAI Whisper and evaluate large language models for product integration. At Expedia I built React interfaces used to train generative AI models and framework adaptors that enabled agentic AI experimentation without breaking existing consumers.',
    'That AI work rests on a long frontend and platform foundation: reusable, accessible React and Angular components, micro-frontend integration, analytics instrumentation, CI/CD pipelines, and backend integration with Node.js and Express.',
  ],
  highlights: [
    { label: 'Building for the web since', value: '2010' },
    { label: 'Core stack', value: 'React, TypeScript, Node.js, Python' },
    { label: 'AI', value: 'OpenAI Whisper, LLM evaluation, generative and agentic AI' },
    { label: 'Delivery', value: 'GitHub Actions, AWS, Datadog' },
    { label: 'Industries', value: 'Government, travel, finance, e-commerce' },
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
    // `import.meta.env` is undefined when the chat proxy loads this module in Node.
    href: `${import.meta.env?.BASE_URL ?? '/'}${resumeFileName}`,
    fileName: resumeFileName,
  },
};
