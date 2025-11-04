import AureaHero from '@/components/AureaHero';
import Navbar from '@/components/Navbar';
import Packs from '@/components/Packs';
import Comparatif from '@/components/Comparatif';
import LandingContactForm from '@/components/LandingContactForm';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <AureaHero />
        <Packs />
        <Comparatif />
        <LandingContactForm />
      </main>
    </>
  );
}