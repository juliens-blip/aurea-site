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
     src="https://res.cloudinary.com/dwzyhcbxg/video/upload/v1762159965/202510201238_1_s58oak.mp4"
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