import type { FeaturedWork } from './types';

export const featuredWork: FeaturedWork[] = [
  {
    id: 'transcription-translation',
    title: 'Transcription and translation services',
    context: 'CACI',
    problem:
      'Analysts working with multilingual audio needed that material transcribed and translated before it could be used in their workflows.',
    built:
      "Full-stack transcription and translation services built on OpenAI's Whisper speech model, with results surfaced in the application.",
    decisions: [
      'Used Whisper for both transcription and translation.',
      'Treated the model as one component of a full-stack feature, owning the service layer and the user interface around it.',
    ],
    outcome: 'Improved access to multilingual data and accelerated analysis workflows.',
    technologies: ['OpenAI Whisper', 'Full-stack'],
    diagram: 'transcription',
  },
  {
    id: 'micro-frontends',
    title: 'Micro-frontend architecture adoption',
    context: 'Expedia',
    problem:
      'Frontend applications built on different tech stacks needed to be integrated into a shared experience.',
    built:
      'Led the adoption of a micro-frontend architecture, alongside reusable, accessible, and extensible React components.',
    decisions: [
      'Chose a micro-frontend approach so applications could keep their own stacks while still composing into one experience.',
      'Invested in shared, extensible components to improve modularity across applications.',
    ],
    outcome: 'Frontend applications with diverse tech stacks integrated seamlessly.',
    technologies: ['React', 'Micro-frontends'],
    diagram: 'micro-frontend',
  },
  {
    id: 'banner-error-handling',
    title: 'Banner management and error-handling UI',
    context: 'CACI',
    problem:
      'Administrators needed a way to give users visual feedback about system updates, warnings, and general information, and application errors needed to be logged and shown to users.',
    built:
      'A banner management system for admin-authored alerts, followed by an error-handling stack that logs application errors and renders them in the UI.',
    decisions: [
      'Built the error-handling UI on the reusable components from the banner system instead of introducing a second notification pattern.',
      'Kept the components responsive and aligned with WCAG so alerts work across devices.',
    ],
    outcome: 'One reusable notification model for both administrative messages and errors.',
    technologies: ['React', 'WCAG'],
  },
  {
    id: 'analytics',
    title: 'Product analytics instrumentation',
    context: 'Expedia and CACI',
    problem:
      'Product and user experience decisions needed evidence about how people actually used the applications.',
    built:
      'As tech lead at Expedia, an analytics project that collects impression and interaction events. At CACI, led the Matomo analytics implementation.',
    decisions: [
      'Captured both impressions and interactions, so the data shows what users saw as well as what they did.',
      'Directed the data toward product and user experience improvements.',
    ],
    outcome:
      'Received the Expedia GSD (Get Stuff Done) Award, Q1 2023, for championing the analytics project.',
    technologies: ['Event analytics', 'Matomo'],
  },
  {
    id: 'delivery-performance',
    title: 'CI/CD, performance, and developer experience',
    context: 'Expedia',
    problem:
      'Deployment time, package size, and visibility into system health all affected how quickly teams could ship and how well applications performed.',
    built:
      'GitHub Actions workflows and CI/CD pipelines, optimized package bundling, Datadog dashboards for system health, and production deployments managed with Jenkins and Spinnaker.',
    decisions: [
      'Automated development and deployment workflows with GitHub Actions.',
      'Made system health and performance observable with dashboards.',
      'Addressed security vulnerabilities in Node.js applications.',
    ],
    outcome:
      'Shorter deployment times, smaller packages, better application performance, and improved developer experience.',
    technologies: ['GitHub Actions', 'Datadog', 'Jenkins', 'Spinnaker', 'Node.js'],
  },
  {
    id: 'data-visualization',
    title: 'Metadata-driven data visualization',
    context: 'Solution Street clients: KPMG and Congruity360',
    problem:
      'Clients needed applications to classify, navigate, and visualize their data, with pages that adapt to that data.',
    built:
      'Data visualization and classification applications with React and D3, including dynamic paging, data navigation, and metadata-based automatic page generation.',
    decisions: [
      'Generated pages from metadata to promote reuse instead of hand-building each view.',
      'Coordinated DOM updates between React and D3 so both could manage the page smoothly.',
    ],
    outcome: 'Reusable visualization pages that update in response to user interaction.',
    technologies: ['React', 'D3'],
  },
];
