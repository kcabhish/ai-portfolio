# AGENTS.md

## Project Overview

This repository contains a professional portfolio website for a senior software engineer with experience in:

- Frontend engineering
- Full-stack development
- Frontend architecture
- Enterprise applications
- Accessibility
- Web performance
- Developer experience
- Cloud and CI/CD
- AI/LLM application development

The portfolio should communicate **engineering depth, architectural thinking, and real-world impact**.

It must not feel like a generic developer portfolio or an AI-generated template.

---

# 1. Core Principles

## 1.1 Accuracy Over Marketing

The portfolio represents a real person's professional experience.

Never fabricate:

- Employers
- Job titles
- Employment dates
- Projects
- Technologies
- Certifications
- Awards
- Metrics
- Responsibilities
- Accomplishments
- Education
- Links
- Clients
- Job titles
- AI experience

If information is not available, do not invent it.

Use neutral language or leave the information out.

The resume and `docs/portfolio-content.md` are the source of truth for professional content.

---

## 1.2 Engineering Depth Over Visual Gimmicks

The portfolio should communicate:

> "This person builds systems."

It should not communicate:

> "This person knows many programming languages."

Emphasize:

- Architecture
- Problem solving
- Technical decisions
- Engineering tradeoffs
- Maintainability
- Scalability
- Accessibility
- Performance
- Developer experience
- Testing
- CI/CD
- Observability
- AI application architecture

Avoid excessive animations, flashy effects, skill percentages, and unnecessary visual decoration.

---

# 2. Source of Truth

Professional content should be maintained separately from UI implementation.

Preferred structure:

```text
docs/
└── portfolio-content.md
```

The content file should contain:

- Professional summary
- Experience
- Projects
- Skills
- Education
- AI experience
- Open-source work
- Contact information
- Social links

Do not hardcode professional information throughout React components.

Prefer structured data:

```text
src/
└── data/
    ├── experience.ts
    ├── projects.ts
    ├── skills.ts
    ├── education.ts
    └── profile.ts
```

UI components should consume this data.

---

# 3. Technology Stack

Unless explicitly instructed otherwise, use:

- React
- TypeScript
- Vite
- Modern CSS / SCSS
- ESLint
- Prettier
- Vitest or the project's existing test framework
- Storybook when reusable component documentation provides value

Do not introduce a framework or library simply because it is popular.

Before adding a dependency, determine whether the functionality can reasonably be implemented using existing project capabilities.

---

# 4. Styling

Use modern CSS or SCSS.

Do not introduce Tailwind CSS unless explicitly requested.

Prefer:

- CSS variables
- Logical properties
- CSS Grid
- Flexbox
- Container queries where appropriate
- Responsive typography
- Reusable design tokens

Example token structure:

```css
:root {
  --color-background: ...;
  --color-surface: ...;
  --color-text-primary: ...;
  --color-text-secondary: ...;
  --color-border: ...;

  --spacing-xs: ...;
  --spacing-sm: ...;
  --spacing-md: ...;
  --spacing-lg: ...;
  --spacing-xl: ...;

  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;
}
```

Do not scatter arbitrary values throughout components when a reusable design token would be more appropriate.

---

# 5. Design Direction

The visual identity should communicate:

- Senior engineer
- Technical architect
- Modern software engineering
- Enterprise experience
- AI engineering
- Attention to detail

Use a design language that is:

- Professional
- Minimal
- Sophisticated
- Technical
- Accessible
- Responsive
- Modern

Avoid:

- Hacker/matrix aesthetics
- Excessive neon
- Excessive gradients
- Huge animated typography
- Generic stock developer images
- Cartoon developer illustrations
- Excessive glassmorphism
- Excessive rounded cards
- Skill percentage bars
- Fake terminal windows used purely as decoration

Visual elements should support the content.

---

# 6. Information Architecture

The default portfolio structure should include:

```text
Home
├── Hero
├── Professional Summary
├── Featured Engineering Work
├── Experience
├── AI Engineering
├── Technical Expertise
├── Engineering Philosophy
├── Personal / Open Source Projects
├── Education
└── Contact
```

Navigation should make important content discoverable quickly.

A recruiter should understand the following within approximately 30 seconds:

1. Who the engineer is
2. Seniority
3. Primary technical strengths
4. Professional experience
5. Major engineering capabilities
6. How to contact them
7. Where to download the resume

---

# 7. Hero Section

The hero should immediately establish professional identity.

Preferred positioning:

**Senior Software Engineer | Front-End Architect | Full-Stack & AI Engineer**

Use a concise supporting statement describing experience in:

- Scalable web applications
- Frontend architecture
- Enterprise systems
- Accessibility
- Performance
- AI/LLM applications

Include clear CTAs:

- View My Work
- Download Resume
- Contact / Let's Connect

Do not make the hero unnecessarily tall.

---

# 8. Professional Experience

Experience should emphasize accomplishments rather than simply listing job responsibilities.

Each experience entry should preferably communicate:

### Context

What type of environment or problem was involved?

### Problem

What challenge needed to be solved?

### Engineering

What was built, changed, or improved?

### Technology

What technologies were involved?

### Impact

What observable result occurred?

Only include measurable metrics when they are explicitly supported by source material.

Do not invent percentages, dollar amounts, performance improvements, team sizes, or adoption numbers.

---

# 9. Featured Engineering Work

Select projects that demonstrate engineering depth.

Prioritize projects involving:

- Frontend architecture
- React
- Angular
- Design systems
- Reusable components
- Micro-frontends
- Accessibility
- Performance
- Analytics
- CI/CD
- Developer tooling
- Backend integration
- AI/LLM applications

Each project should answer:

```text
What was the problem?
What did I build?
What technical decisions mattered?
What technologies were involved?
What was the outcome?
```

Avoid presenting every small task as a separate project.

Group related work into meaningful engineering stories.

---

# 10. AI Engineering

The portfolio should have a dedicated AI engineering section.

Position AI experience as **software engineering applied to AI systems**, unless the source material explicitly supports research-level claims.

Potential areas include:

- LLM integration
- RAG
- Embeddings
- Vector search
- AI agents
- MCP
- Context engineering
- Prompt engineering
- Structured outputs
- AI application architecture
- LiteLLM
- Python
- FastAPI
- Transcription
- Translation

Clearly distinguish:

```text
Professional Experience
```

from:

```text
Personal / Experimental / Learning Projects
```

Do not exaggerate AI experience.

For example, do not describe experimentation with an LLM as "production AI architecture" unless the source material supports that statement.

---

# 11. Technical Skills

Do not use skill-level percentages.

Do not display:

```text
React 95%
Angular 90%
Node.js 85%
```

Instead, group skills by engineering domain.

Example:

```text
Frontend
React
Angular
TypeScript
JavaScript
HTML
CSS
SCSS
Redux
Storybook
Vite

Backend
Node.js
Express
Python
FastAPI
GraphQL

Testing
Jest
Vitest
Playwright
Jasmine
Karma
Mocha
Selenium

Cloud & DevOps
AWS
Docker
GitHub Actions
Jenkins
Spinnaker

Observability
Datadog
Splunk

AI / LLM
LLMs
RAG
Embeddings
MCP
AI Agents
LiteLLM
```

Only include technologies supported by the portfolio source content.

---

# 12. Architecture Visualizations

Technical architecture diagrams may be used to communicate complex experience.

When diagrams are used:

- Keep them understandable
- Use generic architecture
- Avoid confidential implementation details
- Avoid internal company terminology
- Explain the diagram in plain language
- Ensure diagrams work on mobile

Example:

```text
User
  ↓
Application Shell
  ↓
Frontend Modules
  ↓
Shared UI Components
  ↓
GraphQL / APIs
  ↓
Backend Services
```

Do not represent proprietary employer architecture as if it were publicly documented.

---

# 13. Confidentiality

Professional experience may involve proprietary systems.

Never expose:

- Internal URLs
- API keys
- Credentials
- Tokens
- Customer data
- Personal information
- Proprietary source code
- Internal infrastructure details
- Government-sensitive information
- Internal system names
- Confidential project identifiers

If a project is potentially sensitive, describe it at a high level.

Prefer:

> "Built a reusable frontend workflow for enterprise configuration management."

Instead of exposing internal system names or architecture.

---

# 14. Accessibility

Accessibility is a core requirement.

The portfolio itself should demonstrate strong accessibility practices.

Implement:

- Semantic HTML
- Correct heading hierarchy
- Keyboard navigation
- Visible focus indicators
- Accessible navigation
- Accessible buttons and links
- Appropriate ARIA only when needed
- Meaningful alternative text
- Sufficient color contrast
- Reduced-motion support
- Screen-reader-friendly interactions
- Accessible form validation

Do not use ARIA to compensate for incorrect HTML semantics.

Prefer native HTML elements whenever possible.

---

# 15. Responsive Design

The site must work across:

- Mobile
- Tablet
- Laptop
- Desktop
- Large desktop displays

Do not simply shrink the desktop design.

Consider mobile behavior for:

- Navigation
- Timeline
- Project cards
- Architecture diagrams
- Skill groups
- Typography
- Buttons
- Contact forms

Avoid horizontal scrolling unless intentionally required.

---

# 16. Dark and Light Modes

Support:

- Light mode
- Dark mode
- System preference
- Persisted user preference

Ensure both modes maintain:

- Accessibility
- Readability
- Contrast
- Focus visibility
- Consistent hierarchy

Do not use color as the only way to communicate meaning.

---

# 17. Animation

Animations should be subtle and purposeful.

Appropriate examples:

- Section transitions
- Card hover states
- Navigation transitions
- Small interaction feedback
- Timeline progression

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* Reduce or remove non-essential motion */
}
```

Avoid:

- Constant background animation
- Excessive parallax
- Large animated text
- Distracting particles
- Long entrance animations
- Animation that delays access to content

---

# 18. Performance

Performance is a first-class requirement.

Prioritize:

- Fast initial page load
- Minimal JavaScript
- Code splitting where useful
- Lazy loading
- Optimized images
- Efficient CSS
- Minimal third-party dependencies
- Good Core Web Vitals

Do not add large libraries for simple functionality.

Before introducing a dependency, consider:

```text
Can this be implemented with:
- CSS?
- Native browser APIs?
- Existing dependencies?
- A small reusable utility?
```

---

# 19. SEO

Implement technical SEO appropriate for a personal professional portfolio.

Include:

- Descriptive page title
- Meta description
- Open Graph metadata
- Social sharing metadata
- Canonical URL
- Semantic HTML
- Sitemap
- Robots.txt
- Structured data where appropriate

Do not include fake credentials, awards, organizations, or claims for SEO purposes.

---

# 20. Resume

Provide a clear:

**Download Resume**

action.

The resume should be served from an appropriate static asset location.

Example:

```text
public/
└── resume.pdf
```

Do not expose unnecessary metadata.

The portfolio content and resume should remain consistent.

---

# 21. Social Links

When social links are available, support:

- LinkedIn
- GitHub
- Other professional profiles

Never invent profile URLs.

If a URL is unknown, omit it rather than guessing.

Use appropriate accessible labels.

Example:

```tsx
<a href={profile.github} aria-label="GitHub profile">
  GitHub
</a>
```

---

# 22. Contact

Keep contact functionality simple.

Preferred fields:

- Name
- Email
- Message

Provide:

- Validation
- Error states
- Success states
- Accessible labels
- Keyboard support

If no backend is available, do not pretend that a form sends messages.

Use a mail link or clearly indicate that backend integration is required.

---

# 23. Component Architecture

Use reusable components.

Suggested structure:

```text
src/
├── components/
│   ├── common/
│   ├── layout/
│   ├── navigation/
│   ├── hero/
│   ├── experience/
│   ├── projects/
│   ├── skills/
│   ├── ai/
│   ├── architecture/
│   ├── contact/
│   └── footer/
│
├── pages/
│
├── data/
│   ├── profile.ts
│   ├── experience.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── education.ts
│
├── hooks/
│
├── styles/
│
├── utils/
│
└── assets/
```

Avoid monolithic components.

Prefer:

```text
Page
 ↓
Section
 ↓
Reusable Components
 ↓
Data
```

rather than embedding all content directly inside pages.

---

# 24. Component Design

Components should generally follow single-responsibility principles.

Examples:

```text
ExperienceTimeline
ExperienceCard
ProjectGrid
ProjectCard
SkillGroup
TechnologyBadge
ArchitectureDiagram
SocialLinks
ThemeToggle
SectionHeading
Button
```

Do not create a component simply to avoid a few lines of JSX.

Balance reuse with readability.

---

# 25. State Management

Do not introduce global state management unless the application actually requires it.

Prefer:

1. Local component state
2. React context for genuinely shared application state
3. Small custom hooks
4. External state libraries only when justified

Theme preference and navigation state should remain simple.

---

# 26. Data Modeling

Use typed data structures.

Example:

```ts
export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  accomplishments: string[];
  technologies: string[];
}
```

Keep content separate from presentation.

This should allow the portfolio to be updated without modifying UI components.

---

# 27. TypeScript

Use strict TypeScript where practical.

Prefer explicit types for:

- Component props
- Data models
- API responses
- Utility functions
- Configuration

Avoid unnecessary use of:

```ts
any;
```

If `any` is required, document why.

Prefer type-safe alternatives.

---

# 28. Testing

Test important behavior.

Prioritize:

- Navigation
- Theme switching
- Interactive components
- Contact form validation
- Resume links
- Responsive behavior
- Accessibility-critical interactions

For complex components, include unit or component tests.

Use the testing framework already present in the repository before adding another.

---

# 29. Storybook

Use Storybook when it provides meaningful value for reusable components.

Good candidates:

- Buttons
- Cards
- Navigation
- Technology badges
- Section headings
- Timeline components
- Project cards
- Form controls

Stories should demonstrate:

- Default state
- Variants
- Interactive states
- Accessibility considerations

Do not create stories for every trivial component.

---

# 30. Error Handling

Errors should be:

- Understandable
- Accessible
- Actionable
- Non-technical when shown to users

Never expose:

- Stack traces
- Secrets
- API credentials
- Internal URLs
- Debug information

in the production UI.

---

# 31. Security

Never commit:

- API keys
- Passwords
- Tokens
- Secrets
- Private certificates
- Credentials

Use environment variables when configuration requires secrets.

Do not put secrets in:

```text
VITE_*
```

environment variables unless the value is explicitly intended to be public.

Remember that Vite client-side environment variables are exposed to the browser.

---

# 32. Dependencies

Keep dependencies minimal.

Before installing a package:

1. Determine whether the feature is actually needed.
2. Check whether existing dependencies provide the functionality.
3. Consider native browser APIs.
4. Consider bundle size.
5. Consider maintenance and security.
6. Use the project's existing package manager.

Do not replace existing project tooling without a clear reason.

---

# 33. Git Practices

Keep commits focused.

Prefer commits such as:

```text
feat: add experience timeline
feat: add AI engineering section
feat: add dark mode
fix: improve mobile navigation
fix: improve keyboard accessibility
refactor: extract project data
test: add project card coverage
```

Avoid large commits containing unrelated changes.

---

# 34. AI Coding Agent Behavior

When modifying the project:

1. Read `AGENTS.md`.
2. Inspect the existing project structure.
3. Read relevant files before changing them.
4. Reuse existing components and utilities.
5. Avoid unnecessary rewrites.
6. Preserve existing functionality.
7. Make the smallest reasonable change.
8. Run relevant tests.
9. Run linting/type checking when available.
10. Review the resulting UI for responsive and accessibility issues.

Do not blindly regenerate the entire application for a small feature request.

---

# 35. Before Implementing New Features

For a non-trivial feature:

### Step 1 — Understand

Identify:

- Existing architecture
- Existing components
- Existing styles
- Existing data model
- Existing dependencies

### Step 2 — Plan

Determine:

- Components required
- Data required
- State required
- Styling changes
- Testing requirements

### Step 3 — Implement

Reuse existing architecture whenever possible.

### Step 4 — Verify

Check:

- TypeScript
- Lint
- Tests
- Accessibility
- Responsive layout
- Dark mode
- Performance

---

# 36. Content Rules

Professional writing should be:

- Concise
- Specific
- Technical
- Professional
- Evidence-based
- Human

Avoid generic AI-generated phrases such as:

- "Passionate about technology"
- "Results-driven professional"
- "Innovative thought leader"
- "Cutting-edge solutions"
- "Transforming businesses"
- "Leveraging synergies"

unless they are genuinely necessary.

Prefer concrete statements describing engineering work.

---

# 37. Confidential Employer Work

When describing enterprise projects, focus on:

```text
Problem
↓
Approach
↓
Engineering
↓
Technology
↓
Outcome
```

Do not expose proprietary implementation details.

For example:

### Good

> Designed reusable frontend patterns that allowed multiple application teams to adopt a consistent interaction model.

### Avoid

> Built the internal XYZ platform using the company's private API at internal.company.com.

---

# 38. Professional Positioning

The portfolio should consistently reinforce the following themes:

### Frontend Architecture

Experience designing scalable frontend systems and reusable UI architecture.

### Full-Stack Engineering

Ability to work across frontend, backend, APIs, data, and infrastructure.

### Enterprise Engineering

Experience working within complex applications, teams, CI/CD pipelines, and organizational constraints.

### Accessibility

Accessibility should be presented as an engineering discipline, not merely a compliance checkbox.

### Performance

Performance should be treated as an engineering concern involving measurement, diagnosis, and optimization.

### AI Engineering

AI/LLM experience should demonstrate the ability to integrate AI capabilities into real software systems while considering reliability, security, context, and maintainability.

---

# 39. Mobile-First Considerations

Design mobile layouts intentionally.

The mobile experience should preserve:

- Content hierarchy
- Readability
- Navigation
- Accessibility
- Interaction affordances

Do not simply hide important content on mobile.

If content must be collapsed, provide an accessible interaction to reveal it.

---

# 40. Browser Support

Use modern browser APIs while maintaining reasonable compatibility with current versions of:

- Chrome
- Edge
- Firefox
- Safari

Do not add polyfills unless required.

---

# 41. Visual QA

After implementing significant UI changes, inspect the rendered result.

Check:

- Spacing
- Typography
- Alignment
- Responsive behavior
- Contrast
- Focus states
- Overflow
- Animation
- Dark mode
- Mobile navigation

A technically correct implementation is not complete if the visual result is poor.

---

# 42. Definition of Done

A portfolio feature is complete when:

- [ ] Requirements are implemented
- [ ] Existing functionality still works
- [ ] Content is factually accurate
- [ ] No information has been fabricated
- [ ] No confidential information is exposed
- [ ] TypeScript passes
- [ ] Lint passes
- [ ] Relevant tests pass
- [ ] Keyboard navigation works
- [ ] Accessibility has been considered
- [ ] Mobile layout works
- [ ] Desktop layout works
- [ ] Dark mode works
- [ ] Visual hierarchy is clear
- [ ] No unnecessary dependency was added
- [ ] Performance has been considered
- [ ] SEO requirements are satisfied where applicable

---

# 43. Default Development Workflow

When asked to implement a feature:

```text
Read AGENTS.md
      ↓
Inspect existing code
      ↓
Inspect portfolio content
      ↓
Understand requirements
      ↓
Plan implementation
      ↓
Implement
      ↓
Run tests / lint / typecheck
      ↓
Review accessibility
      ↓
Review responsive behavior
      ↓
Review visual quality
      ↓
Summarize changes
```

---

# 44. Important Rule

The portfolio should demonstrate engineering maturity through the quality of the implementation itself.

The codebase should be:

- Maintainable
- Understandable
- Accessible
- Performant
- Testable
- Modular
- Secure

The website should not merely **claim** that I value these engineering principles.

It should **demonstrate them**.
