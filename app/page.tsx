import AureaHero from '@/components/AureaHero';
import Navbar from '@/components/Navbar';
import Packs from '@/components/Packs';
import Comparatif from '@/components/Comparatif';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <AureaHero />
        <Packs />
        <Comparatif />
      </main>
    </>
  );
}