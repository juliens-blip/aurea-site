'use client';

import Navbar from '@/components/Navbar';
import PrestigeContactForm from '@/components/PrestigeContactForm';
import styles from './packprestige.module.css';

export default function PackPrestige() {
  return (
    <>
      <Navbar />
      
      <div className={styles.packHero} id="packPrestigeHero">
        <video className={styles.packVideo} autoPlay muted loop playsInline>
          <source
            src="https://www.dropbox.com/scl/fi/vu1gie7czfikld6t1efq9/grok-video-bf07b467-df7b-434a-a341-a363ef7edf64.mp4?rlkey=uzf5d790hqwrle8x523gtgqv7&st=3qpozc5x&dl=1"
            type="video/mp4"
          />
        </video>
        <div className={styles.packOverlay}></div>

        <div className={styles.packContent}>
          <div>
            <h1 className={styles.packTitle}>
              Le Prestige combiné à l'IA<br />
              L'Excellence Automatisée
            </h1>
          </div>
        </div>

        <div className={styles.packScroll} onClick={() => {
          document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <span className={styles.packScrollText}>En savoir plus</span>
          <span>↓</span>
        </div>
      </div>

      {/* Section 1 : Le Prestige Redéfini */}
      <div className={styles.packSection} id="content">
        <div className={styles.packContainer}>
          <div className={styles.packImageWrapper}>
            <img 
              src="https://www.dropbox.com/scl/fi/jxviw9mnyzbr8r19hm6lt/unnamed-21.jpg?rlkey=wvrbzvqfx3fyd0ikf4nmupd6l&st=7n8u82p8&dl=1" 
              alt="Prestige Luxe" 
              className={styles.packImage}
            />
          </div>
          <div className={styles.packTextContent}>
            <h2 className={styles.packSectionTitle}>Le Prestige Redéfini</h2>
            <p className={styles.packSectionDescription}>
              L'excellence digitale au service des marques de luxe. Notre offre Prestige Plus IA combine sophistication et intelligence artificielle pour propulser votre communication vers de nouveaux sommets. Automatisation complète de vos processus : génération de contenus premium adaptés à votre identité, newsletters personnalisées pour votre clientèle d'exception, alimentation intelligente de vos réseaux sociaux, création de visuels haute définition et de textes raffinés. Votre blog se nourrit automatiquement de contenus pertinents et SEO-optimisés. Devis et propositions commerciales générés instantanément avec une présentation impeccable. Chaque élément reflète le prestige de votre maison. Matériaux visuels d'exception, charte graphique respectée, ton de voix cohérent. Un gain de temps considérable pour vous concentrer sur votre cœur de métier pendant que l'IA travaille pour votre rayonnement.
            </p>
            <a href="#contact" className={styles.packCta}>Prendre contact</a>
          </div>
        </div>
      </div>

      {/* Section 2 : L'Intelligence au Service du Confort */}
      <div className={`${styles.packSection} ${styles.packSectionAlt}`}>
        <div className={`${styles.packContainer} ${styles.packContainerReverse}`}>
          <div className={styles.packImageWrapper}>
            <img 
              src="https://www.dropbox.com/scl/fi/4z3qvxtanu50kf9hp9sds/unnamed-22.jpg?rlkey=9nf7b9ym8ad53hs1wms95hglx&st=zs2zcsjv&dl=1" 
              alt="Intelligence Artificielle" 
              className={styles.packImage}
            />
          </div>
          <div className={styles.packTextContent}>
            <h2 className={styles.packSectionTitle}>L'Intelligence au Service du Confort</h2>
            <p className={styles.packSectionDescription}>
              Votre communication ne se contente plus de suivre, elle anticipe. Grâce à notre intelligence artificielle spécialisée dans le luxe, votre présence digitale s'adapte en temps réel aux tendances et aux attentes de votre clientèle premium. Contenus personnalisés qui résonnent avec l'ADN de votre marque et les aspirations de votre audience. Blogs alimentés automatiquement avec des articles de fond qui positionnent votre expertise. Newsletters intelligentes qui segmentent et personnalisent chaque message pour maximiser l'engagement. Réseaux sociaux pilotés par l'IA avec publications optimisées aux meilleurs moments, visuels générés sur-mesure et légendes captivantes. Devis automatisés qui conservent votre élégance et votre professionnalisme tout en accélérant vos conversions. Analyses prédictives qui identifient les opportunités avant vos concurrents. Libérez 80% de votre temps de production tout en multipliant votre impact et votre visibilité dans l'univers du luxe.
            </p>
            <a href="#contact" className={styles.packCta}>Prendre contact</a>
          </div>
        </div>
      </div>

      <PrestigeContactForm />
    </>
  );
}