import {
  aiExperience,
  architectureDiagrams,
  awards,
  education,
  experience,
  featuredWork,
  principles,
  profile,
  projects,
  skills,
} from '../data';
import { AboutSection } from '../components/about/AboutSection';
import { AiEngineeringSection } from '../components/ai/AiEngineeringSection';
import { Section } from '../components/common/Section';
import { ContactSection } from '../components/contact/ContactSection';
import { RecognitionSection } from '../components/education/RecognitionSection';
import { ExperienceTimeline } from '../components/experience/ExperienceTimeline';
import { Hero } from '../components/hero/Hero';
import { PhilosophySection } from '../components/philosophy/PhilosophySection';
import { FeaturedWorkSection } from '../components/projects/FeaturedWorkSection';
import { OpenSourceSection } from '../components/projects/OpenSourceSection';
import { ExpertiseSection } from '../components/skills/ExpertiseSection';

export function HomePage() {
  return (
    <>
      <Hero profile={profile} experience={experience} />
      <AboutSection profile={profile} education={education} />
      <FeaturedWorkSection work={featuredWork} diagrams={architectureDiagrams} />
      <Section id="experience" eyebrow="Experience" title="Professional experience">
        <ExperienceTimeline roles={experience} />
      </Section>
      <AiEngineeringSection items={aiExperience} />
      <ExpertiseSection groups={skills} />
      <PhilosophySection principles={principles} />
      <RecognitionSection awards={awards} education={education} />
      <OpenSourceSection
        projects={projects}
        githubUrl={profile.social.find((link) => link.id === 'github')?.href ?? ''}
      />
      <ContactSection profile={profile} />
    </>
  );
}
