import { profile } from './data';
import { navigation, sectionNavigation } from './data/navigation';
import { VirtualKc } from './components/chat/VirtualKc';
import { SiteFooter } from './components/footer/SiteFooter';
import { MotionBackdrop } from './components/layout/MotionBackdrop';
import { SkipLink } from './components/layout/SkipLink';
import { SectionRail } from './components/navigation/SectionRail';
import { SiteHeader } from './components/navigation/SiteHeader';
import { HomePage } from './pages/HomePage';

export function App() {
  return (
    <>
      <MotionBackdrop />
      <SkipLink targetId="main" />
      <SiteHeader name={profile.name} items={navigation} />
      <SectionRail items={sectionNavigation} />
      <main id="main" tabIndex={-1}>
        <HomePage />
      </main>
      <SiteFooter profile={profile} />
      <VirtualKc />
    </>
  );
}
