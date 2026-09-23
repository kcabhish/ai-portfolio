import type { ArchitectureDiagramData, DiagramId } from './types';

export const architectureDiagrams: Record<DiagramId, ArchitectureDiagramData> = {
  'micro-frontend': {
    id: 'micro-frontend',
    title: 'Micro-frontend composition',
    caption:
      'A generalized view of how independently built frontend applications can share one experience. It does not describe any specific production system.',
    steps: [
      { label: 'User', detail: 'Uses one consistent experience.' },
      { label: 'Application shell', detail: 'Loads and composes the frontend modules.' },
      {
        label: 'Frontend modules',
        detail: 'Built and deployed independently, on different tech stacks.',
      },
      { label: 'Shared components', detail: 'Reusable, accessible React components.' },
      { label: 'Backend services', detail: 'APIs the modules integrate with.' },
    ],
  },
  transcription: {
    id: 'transcription',
    title: 'Transcription and translation flow',
    caption:
      'A generalized view of a speech-to-text feature built as a full-stack service. It does not describe any specific production system.',
    steps: [
      { label: 'Media input', detail: 'Audio is submitted from the application.' },
      { label: 'Service layer', detail: 'Connects the application to the speech model.' },
      { label: 'Speech model', detail: 'Whisper produces a transcript.' },
      { label: 'Translation', detail: 'Non-English speech is translated.' },
      { label: 'Review UI', detail: 'Results are presented for analysis.' },
    ],
  },
};
