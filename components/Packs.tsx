'use client';

import { useEffect } from 'react';
import styles from './Packs.module.css';

export default function Packs() {
  useEffect(() => {
    const observerOptions = { 
      threshold: 0.15, 
      rootMargin: '0px 0px -100px 0px' 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.fadeIn);
        }
      });
    }, observerOptions);

    document.querySelectorAll(`.${styles.packCard}`).forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.packsSection} id="packs">
      <div className={styles.packsContainer}>
        <div className={styles.packsGrid}>
          {/* Pack Essentiel */}
          <article className={styles.packCard}>
            <div className={styles.packImageContainer}>
              <img 
                src="https://www.dropbox.com/scl/fi/3a0zgv7yrva5i6j3vqv5c/unnamed-12.jpg?rlkey=s1qbxx64ae5k1cm8tzktzd8bd&st=wl4mvuoa&dl=1" 
                alt="Pack Essentiel AURÉA" 
                className={styles.packImage}
              />
              <div className={styles.packOverlay}></div>
            </div>
            <div className={styles.packContent}>
              <div className={styles.packHeader}>
                <h2 className={styles.packTitle}>🩵 Pack Essentiel</h2>
                <p className={styles.packTagline}>Votre présence, amplifiée.</p>
              </div>
              <ul className={styles.packFeatures}>
                <li>Création et harmonisation réseaux sociaux</li>
                <li>Publication automatisée via IA</li>
                <li>Contenus élégants adaptés à votre univers</li>
                <li>Mini-blog IA pour SEO</li>
                <li>Newsletter mensuelle automatique</li>
                <li>Devis personnalisé avec IA</li>
              </ul>
              <div className={styles.packFooter}>
                <p className={styles.packIdeal}>💼 Idéal pour : Hôtels, restaurants, salles de sport, garages de prestige</p>
                <p className={styles.packPrice}>À partir de 890 € / mois</p>
                <a href="/packessentiel" className={styles.packCta}>En savoir plus</a>
              </div>
            </div>
          </article>

          {/* Pack Prestige */}
          <article className={styles.packCard}>
            <div className={styles.packImageContainer}>
              <img 
                src="https://www.dropbox.com/scl/fi/os9weqmtaxnjg42y111zm/unnamed-13.jpg?rlkey=skhztj30qvg9k5h1j024a9jj9&st=qe1uc8ji&dl=1" 
                alt="Pack Prestige AURÉA" 
                className={styles.packImage}
              />
              <div className={styles.packOverlay}></div>
            </div>
            <div className={styles.packContent}>
              <div className={styles.packHeader}>
                <h2 className={styles.packTitle}>✨ Pack Prestige</h2>
                <p className={styles.packTagline}>Votre image, orchestrée.</p>
              </div>
              <ul className={styles.packFeatures}>
                <li>Identité visuelle complète</li>
                <li>Storytelling IA personnalisé</li>
                <li>Gestion multicanale automatisée</li>
                <li>Présentations pro automatiques</li>
                <li>Suivi performance IA mensuel</li>
                <li>Option shooting photo/vidéo</li>
              </ul>
              <div className={styles.packFooter}>
                <p className={styles.packIdeal}>💼 Idéal pour : Maisons de prestige, hôtels 5*, marques émergentes du luxe</p>
                <p className={styles.packPrice}>À partir de 1 790 € / mois</p>
                <a href="/packprestige" className={styles.packCta}>Découvrir le Pack</a>
              </div>
            </div>
          </article>

          {/* Pack Signature */}
          <article className={styles.packCard}>
            <div className={styles.packImageContainer}>
              <img 
                src="https://www.dropbox.com/scl/fi/08pq4yhmsk2bc22i7mnqf/unnamed-14.jpg?rlkey=tb9ocialf0z2sn39ognvup6bc&st=iygvgfqi&dl=1" 
                alt="Pack Signature AURÉA" 
                className={styles.packImage}
              />
              <div className={styles.packOverlay}></div>
            </div>
            <div className={styles.packContent}>
              <div className={styles.packHeader}>
                <h2 className={styles.packTitle}>👑 Pack Signature</h2>
                <p className={styles.packTagline}>Votre univers, sublimé.</p>
              </div>
              <ul className={styles.packFeatures}>
                <li>Direction artistique continue</li>
                <li>Contenus IA ultra personnalisés</li>
                <li>Automatisation complète 24/7</li>
                <li>Gestion publicitaire optimisée IA</li>
                <li>Rapports stratégiques mensuels</li>
                <li>Accès labo tendances IA & Luxe</li>
              </ul>
              <div className={styles.packFooter}>
                <p className={styles.packIdeal}>💼 Idéal pour : Groupes hôteliers, brokers yacht, marques internationales</p>
                <p className={styles.packPrice}>Sur devis personnalisé</p>
                <a href="/packprenium" className={styles.packCta}>Demander un devis</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}