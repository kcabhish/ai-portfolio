/**
 * Site identity shared by the app and the build-time metadata plugin.
 * Must stay free of browser-only or `import.meta.env` references so Node can import it.
 */
export const site = {
  name: 'Abhishek KC',
  jobTitle: 'Senior Software Engineer',
  title: 'Abhishek KC | Senior Software Engineer, Full-Stack AI Engineer, Front-End Architect',
  description:
    'Portfolio of Abhishek KC, a senior software engineer who builds full-stack AI features, from speech and LLM integrations to the services and accessible React interfaces around them.',
  alumniOf: 'Minnesota State University Moorhead',
  linkedin: 'https://www.linkedin.com/in/akc-a30918125',
  github: 'https://github.com/kcabhish',
} as const;
