import type { Principle } from './types';

export const principles: Principle[] = [
  {
    title: 'Treat the model as one component of the system',
    description:
      'An AI feature is only as reliable as the services, interfaces, and contracts around the model, so those get the same engineering care as any other code.',
    evidence:
      'Full-stack Whisper services and LLM feasibility analyses at CACI, backward-compatible agentic AI adaptors at Expedia.',
  },
  {
    title: 'Accessibility is part of the definition of done',
    description:
      'Accessible markup, keyboard support, and contrast are designed in from the start, not audited in at the end.',
    evidence: 'WCAG and Section 508 work at CACI, CGI, and FINRA.',
  },
  {
    title: 'Build components that the next feature can reuse',
    description:
      'A well-designed component should make the next feature cheaper to build, not just finish the current one.',
    evidence: 'Error-handling UI built on top of the banner system components at CACI.',
  },
  {
    title: 'Measure before optimizing',
    description:
      'Performance and product decisions should rest on data from dashboards and analytics, not assumptions.',
    evidence: 'Datadog dashboards, bundle optimization, and analytics instrumentation at Expedia.',
  },
  {
    title: 'Automate verification and delivery',
    description:
      'Test automation and reliable pipelines let a codebase keep changing safely and make deploying a routine event.',
    evidence:
      'Jest and Enzyme framework at CGI, Selenium automation at UNISON, GitHub Actions CI/CD at Expedia.',
  },
  {
    title: 'Keep the dependency graph healthy',
    description:
      'Upgrades and vulnerability fixes are ongoing engineering work, not an emergency every few years.',
    evidence: 'npm and Python dependency maintenance at CACI, Node.js security work at Expedia.',
  },
];
