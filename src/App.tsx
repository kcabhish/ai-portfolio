import { profile } from './data';
import { navigation } from './data/navigation';
import { SiteFooter } from './components/footer/SiteFooter';
import { MotionBackdrop } from './components/layout/MotionBackdrop';
import { SkipLink } from './components/layout/SkipLink';
import { SiteHeader } from './components/navigation/SiteHeader';
import { HomePage } from './pages/HomePage';

export function App() {
  return (
    <>
      <MotionBackdrop />
      <SkipLink targetId="main" />
      <SiteHeader name={profile.name} items={navigation} />
      <main id="main" tabIndex={-1}>
        <HomePage />
      </main>
      <SiteFooter profile={profile} />
    </>
  );
}
