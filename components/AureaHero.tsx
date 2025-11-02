import React from 'react';
import styles from './AureaHero.module.css';

export default function AureaHero() {
  return (
    <div className={styles.aureaHero} id="aureaHero">
      <video 
        className={styles.aureaVideo}
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
      >
        <source
          src="https://www.dropbox.com/scl/fi/imp7gp7537gi0h9z64h0b/202510201238.mp4?rlkey=83c6nj8uoaz7rucx9xzur7tu8&st=m1x86196&dl=1"
          type="video/mp4"
        />
      </video>
      
      <div className={styles.aureaOverlay} />

      <div className={styles.aureaContent}>
        <div>
          <h1 className={styles.aureaTitle}>
            Votre Agence Digitale de Luxe
          </h1>
          <p className={styles.aureaSubtitle}>
            L'excellence au service de votre marque
          </p>
        </div>
      </div>

      <div className={styles.aureaScroll}>↓</div>
    </div>
  );
}