/**
 * Site identity shared by the app and the build-time metadata plugin.
 * Must stay free of browser-only or `import.meta.env` references so Node can import it.
 */
export const site = {
  name: 'Abhishek KC',
  jobTitle: 'Senior Software Engineer',
  title: 'Abhishek KC | Senior Software Engineer, Front-End Architect, Full-Stack & AI Engineer',
  description:
    'Portfolio of Abhishek KC, a senior software engineer focused on frontend architecture, accessible and performant web applications, enterprise delivery, and AI/LLM application development.',
  alumniOf: 'Minnesota State University Moorhead',
  linkedin: 'https://www.linkedin.com/in/akc-a30918125',
  github: 'https://github.com/kcabhish',
} as const;
