'use client';

import Navbar from '@/components/Navbar';
import LandingContactForm from '@/components/LandingContactForm';
import styles from './packessentiel.module.css';

export default function PackEssentiel() {
  return (
    <>
      <Navbar />
      
      <div className={styles.packHero} id="packEssentielHero">
        <video className={styles.packVideo} autoPlay muted loop playsInline>
          <source
            src="https://www.dropbox.com/scl/fi/1nj46m9ysa734eo9l04ds/grok-video-c31c84b2-325e-421e-aea1-710a9221f678.mp4?rlkey=sr1c571rmn9l9ylmegmss8xwk&st=yqsubs33&dl=1"
            type="video/mp4"
          />
        </video>
        <div className={styles.packOverlay}></div>

        <div className={styles.packContent}>
          <div>
            <h1 className={styles.packTitle}>Pack Essentiel</h1>
          </div>
        </div>

        <div className={styles.packScroll} onClick={() => {
          document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <span className={styles.packScrollText}>En savoir plus</span>
          <span>↓</span>
        </div>
      </div>

      <div className={styles.packSection} id="content">
        <div className={styles.packContainer}>
          <div className={styles.packImageWrapper}>
            <img 
              src="https://www.dropbox.com/scl/fi/z8lprma0fuiu4nqqlbwvf/unnamed-17.jpg?rlkey=7mkw08xnt8586php64bzauobu&st=mimwaam2&dl=1" 
              alt="Vitrine Digitale Premium" 
              className={styles.packImage}
            />
          </div>
          <div className={styles.packTextContent}>
            <h2 className={styles.packSectionTitle}>Une Vitrine Digitale d'Exception</h2>
            <p className={styles.packSectionDescription}>
              Votre site web est bien plus qu'une simple présence en ligne : c'est l'incarnation digitale de votre excellence. Nous concevons des plateformes sur mesure où chaque détail reflète le prestige de votre marque. Design épuré et sophistiqué, navigation intuitive, expérience utilisateur fluide sur tous les supports. Chaque élément est pensé pour captiver vos visiteurs et transformer leur intérêt en engagement durable. Performance optimale, temps de chargement instantané et interface responsive garantissent une expérience premium à chaque interaction.
            </p>
            <a href="/#contact" className={styles.packCta}>Prendre contact</a>
          </div>
        </div>
      </div>

      <div className={`${styles.packSection} ${styles.packSectionAlt}`}>
        <div className={`${styles.packContainer} ${styles.packContainerReverse}`}>
          <div className={styles.packImageWrapper}>
            <img 
              src="https://www.dropbox.com/scl/fi/n1y020wuxmc94fbffpogh/unnamed-18.jpg?rlkey=agy0bukm78x75652hgskhjivd&st=wr9v337k&dl=1" 
              alt="Visibilité et Performance" 
              className={styles.packImage}
            />
          </div>
          <div className={styles.packTextContent}>
            <h2 className={styles.packSectionTitle}>Propulsez Votre Visibilité</h2>
            <p className={styles.packSectionDescription}>
              L'excellence ne suffit pas si elle reste invisible. Notre approche SEO stratégique positionne votre marque au sommet des résultats de recherche. Nous orchestrons une présence digitale qui attire naturellement votre clientèle cible. Optimisation technique pointue, architecture de contenu intelligente, stratégie de mots-clés ciblés et création de contenus premium qui résonnent avec votre audience. Chaque action est mesurée, analysée et affinée pour maximiser votre retour sur investissement. Visibilité accrue, trafic qualifié et croissance durable de votre empreinte digitale.
            </p>
            <a href="/#contact" className={styles.packCta}>Prendre contact</a>
          </div>
        </div>
      </div>

      <LandingContactForm />
    </>
  );
}