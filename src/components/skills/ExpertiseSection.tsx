import type { SkillGroup } from '../../data/types';
import { Section } from '../common/Section';
import { TechList } from '../common/TechList';
import styles from './ExpertiseSection.module.css';

export function ExpertiseSection({ groups }: { groups: SkillGroup[] }) {
  return (
    <Section
      id="expertise"
      eyebrow="Technical expertise"
      title="Tools, grouped by engineering domain"
    >
      <div className={styles.grid}>
        {groups.map((group) => (
          <div key={group.domain} className={styles.group}>
            <h3 className={styles.domain}>{group.domain}</h3>
            <TechList items={group.skills} label={`${group.domain} skills`} />
          </div>
        ))}
      </div>
    </Section>
  );
}
