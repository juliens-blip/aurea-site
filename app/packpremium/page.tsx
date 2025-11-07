'use client';

import Navbar from '@/components/Navbar';
import PremiumContactForm from '@/components/PremiumContactForm';
import styles from './packpremium.module.css';

export default function PackPremium() {
  return (
    <>
      <Navbar />
      
      <div className={styles.packHero} id="packPremiumHero">
        <video className={styles.packVideo} autoPlay muted loop playsInline>
          <source
            src="https://www.dropbox.com/scl/fi/w91drjyzt5ce8xw6u7dh4/grok-video-82fb8c82-9877-4491-a59b-67c1c57a4259.mp4?rlkey=9y6i73tg7dradi2baod38rpzo&st=yd0ma0n5&dl=1"
            type="video/mp4"
          />
        </video>
        <div className={styles.packOverlay}></div>

        <div className={styles.packContent}>
          <div className={styles.packBadge}>Nombre de places limité</div>
          <div>
            <h1 className={styles.packTitle}>Pack Prenium</h1>
            <p className={styles.packSubtitle}>
              Transformation Digitale Elite pour Dirigeants Visionnaires
            </p>
          </div>
        </div>

        <div className={styles.packScroll} onClick={() => {
          document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <span className={styles.packScrollText}>Découvrez</span>
          <span>↓</span>
        </div>
      </div>

      {/* Section 1 : Écosystème Digital Ultra-Luxe */}
      <div className={styles.packSection} id="content">
        <div className={styles.packContainer}>
          <div className={styles.packImageWrapper}>
            <img 
              src="https://www.dropbox.com/scl/fi/y3ym5hwkqjumcqpr3vvbf/unnamed-24.jpg?rlkey=susaymm6xgocr6qz3e0tlah7k&st=40qaotfl&dl=1" 
              alt="Excellence Digitale Prestige" 
              className={styles.packImage}
            />
          </div>
          <div className={styles.packTextContent}>
            <div className={styles.sectionBadge}>Excellence Digitale</div>
            <h2 className={styles.packSectionTitle}>Un Écosystème Digital à Votre Image</h2>
            <p className={styles.packSectionDescription}>
              Votre univers digital n'est pas qu'une vitrine, c'est l'extension même de votre vision. Nous orchestrons des expériences numériques où chaque interaction respire le raffinement. Architecture technique irréprochable, design sur mesure sublimé par l'intelligence artificielle, parcours utilisateur pensé pour l'élite. De la conception à l'automatisation complète, chaque composante de votre présence digitale est conçue pour magnifier votre excellence et propulser votre croissance. Performance maximale, sécurité absolue et évolutivité illimitée.
            </p>
            <a href="#contact" className={styles.packCta}>Réserver une consultation</a>
          </div>
        </div>
      </div>

      {/* Section 2 : Transformation IA & Automatisation Elite */}
      <div className={`${styles.packSection} ${styles.packSectionAlt}`}>
        <div className={`${styles.packContainer} ${styles.packContainerReverse}`}>
          <div className={styles.packImageWrapper}>
            <img 
              src="https://www.dropbox.com/scl/fi/dfkygf2vfsrw590ntsz62/unnamed-25.jpg?rlkey=q3vhk992x8hw53qg4hnq4cz5s&st=8b8dgkrx&dl=1" 
              alt="Intelligence Artificielle Elite" 
              className={styles.packImage}
            />
          </div>
          <div className={styles.packTextContent}>
            <div className={styles.sectionBadge}>Intelligence Artificielle</div>
            <h2 className={styles.packSectionTitle}>L'Intelligence au Service de Votre Ambition</h2>
            <p className={styles.packSectionDescription}>
              Libérez le potentiel de votre organisation grâce à l'automatisation intelligente. Nous déployons des solutions IA propriétaires qui transforment radicalement vos opérations : automatisation marketing sophistiquée, qualification de leads premium, service client prédictif, analyse décisionnelle en temps réel. Chaque processus est optimisé, chaque interaction personnalisée, chaque décision éclairée par la puissance de l'intelligence artificielle. Votre équipe se concentre sur la stratégie pendant que l'IA pilote l'exécution avec une précision chirurgicale. ROI mesurable, gains de productivité spectaculaires, avantage concurrentiel durable.
            </p>
            <a href="#contact" className={styles.packCta}>Réserver une consultation</a>
          </div>
        </div>
      </div>

      <PremiumContactForm />
    </>
  );
}