import type { AiExperience } from './types.ts';

/** Professional AI work only. Personal or experimental work belongs in `projects.ts`. */
export const aiExperience: AiExperience[] = [
  {
    id: 'llm-evaluation',
    title: 'LLM evaluation and feasibility',
    context: 'CACI',
    description:
      'Researched and evaluated emerging large language models, producing feasibility analyses and effort estimates that guided decisions about integrating them into the product.',
    technologies: ['LLMs'],
  },
  {
    id: 'speech',
    title: 'Speech transcription and translation',
    context: 'CACI',
    description:
      "Implemented full-stack transcription and translation services using OpenAI's Whisper model, owning the work from the service layer through the user interface.",
    technologies: ['OpenAI Whisper', 'Full-stack'],
  },
  {
    id: 'genai-training-ui',
    title: 'Interfaces for generative AI training',
    context: 'Expedia',
    description:
      'Developed responsive React widgets, in collaboration with the LLM team, used in training generative AI models.',
    technologies: ['React', 'Generative AI'],
  },
  {
    id: 'agentic-adaptors',
    title: 'Adaptors for agentic AI experimentation',
    context: 'Expedia',
    description:
      'Built adaptors that extended an internal framework so teams could experiment with agentic AI without breaking backward compatibility for existing consumers.',
    technologies: ['Agentic AI', 'Framework design'],
  },
  {
    id: 'chat-translation',
    title: 'Multi-language chat',
    context: 'Expedia',
    description:
      'Added language translation to a chat application with Language IO, enabling conversations across languages.',
    technologies: ['Language IO', 'Machine translation'],
  },
];
