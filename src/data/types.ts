/** Month-precision date in `YYYY-MM` form. */
export type YearMonth = `${number}-${number}`;

export interface SocialLink {
  id: 'linkedin' | 'github';
  label: string;
  href: string;
  /** Visible handle or short URL shown next to the label. */
  display: string;
}

export interface Profile {
  name: string;
  /** Roles shown in the hero, in priority order. */
  headline: string[];
  tagline: string;
  summary: string[];
  social: SocialLink[];
  resume: {
    href: string;
    fileName: string;
  };
}

export interface ClientEngagement {
  client: string;
  startDate?: YearMonth;
  endDate?: YearMonth;
  accomplishments: string[];
  technologies: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: YearMonth;
  /** Omitted for the current role. */
  endDate?: YearMonth;
  summary?: string;
  accomplishments: string[];
  technologies: string[];
  engagements?: ClientEngagement[];
  /** Earlier roles are collapsed by default to keep recent work prominent. */
  isEarlier?: boolean;
}

export type DiagramId = 'micro-frontend' | 'transcription';

export interface FeaturedWork {
  id: string;
  title: string;
  /** Where the work happened, e.g. the employer. */
  context: string;
  problem: string;
  built: string;
  decisions: string[];
  outcome?: string;
  technologies: string[];
  diagram?: DiagramId;
}

export interface DiagramStep {
  label: string;
  detail: string;
}

export interface ArchitectureDiagramData {
  id: DiagramId;
  title: string;
  caption: string;
  steps: DiagramStep[];
}

export interface AiExperience {
  id: string;
  title: string;
  context: string;
  description: string;
  technologies: string[];
}

export interface SkillGroup {
  domain: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationDate: YearMonth;
}

export interface Award {
  name: string;
  organization: string;
  date: string;
  reason: string;
}

export interface Principle {
  title: string;
  description: string;
  evidence: string;
}

export interface PersonalProject {
  name: string;
  description: string;
  href: string;
  technologies: string[];
}
