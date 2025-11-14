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
          src="https://res.cloudinary.com/dwzyhcbxg/video/upload/q_80,w_1920,c_fill/v1763112626/202511141015_1_ackp2r.mp4"
          type="video/mp4"
        />
        Votre navigateur ne supporte pas la vidéo HTML5
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
