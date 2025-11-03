'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const res = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nom: formData.nom,
    email: formData.email,
    telephone: formData.telephone,
    entreprise: formData.entreprise,
  }),
});

  
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CONFIG AIRTABLE - depuis variables d'environnement
  const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || "";
  const AIRTABLE_TABLE_ID = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_ID || "";
  const AIRTABLE_TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN || "";

  const FIELD_IDS = {
    nom: "fldCTmWOPwAnzIyU8",
    email: "fldCmMMNFULia4e3A",
    telephone: "fldMBrfDQqmemqXjx",
    entreprise: "fld9Cw2VxtZV4BFf0"
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' });

    // Honeypot check
    if (formData.website) return;

    // Validation
    if (!formData.nom || !formData.telephone || !formData.email || !formData.entreprise) {
      setFeedback({
        message: 'Merci de remplir tous les champs obligatoires.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    const fields = {
      [FIELD_IDS.nom]: formData.nom,
      [FIELD_IDS.email]: formData.email,
      [FIELD_IDS.telephone]: formData.telephone,
      [FIELD_IDS.entreprise]: formData.entreprise
    };

    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ records: [{ fields }] })
        }
      );

      if (!res.ok) {
        const errTxt = await res.text();
        throw new Error(errTxt);
      }

      setFeedback({
        message: 'Merci ! Vos informations ont bien été envoyées. Nous revenons vers vous sous 1 heure.',
        type: 'success'
      });
      
      setFormData({
        nom: '',
        telephone: '',
        email: '',
        entreprise: '',
        website: ''
      });
    } catch (err) {
      console.error('Airtable error:', err);
      setFeedback({
        message: 'Erreur lors de l\'envoi. Veuillez réessayer.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.mainContainer} id="contact">
      {/* Colonne gauche - Formulaire */}
      <div className={styles.leftColumn}>
        <h2 className={styles.qTitle}>Prenons contact</h2>
        <p className={styles.qSubtitle}>
          Initier votre premier contact — réponse sous <strong>&lt; 1h</strong>.
        </p>

        <div className={styles.questionnaireCard}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.qGroup}>
              <label className={styles.qLabel} htmlFor="nom">
                Nom *
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                required
                placeholder="Votre nom"
                className={styles.qInput}
                value={formData.nom}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div className={styles.qGroup}>
              <label className={styles.qLabel} htmlFor="telephone">
                Téléphone *
              </label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                required
                placeholder="+33 6 12 34 56 78"
                className={styles.qInput}
                value={formData.telephone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>

            <div className={styles.qGroup}>
              <label className={styles.qLabel} htmlFor="email">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="vous@exemple.com"
                className={styles.qInput}
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className={styles.qGroup}>
              <label className={styles.qLabel} htmlFor="entreprise">
                Nom Entreprise *
              </label>
              <input
                id="entreprise"
                name="entreprise"
                type="text"
                required
                placeholder="Votre société"
                className={styles.qInput}
                value={formData.entreprise}
                onChange={handleChange}
                autoComplete="organization"
              />
            </div>

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
            />

            <button
              className={styles.qSubmit}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi…' : 'Nous contacter'}
            </button>

            <p className={styles.qLegal}>
              En envoyant ce formulaire vous acceptez notre politique de confidentialité.
            </p>

            {feedback.message && (
              <div
                className={`${styles.qFeedback} ${
                  feedback.type === 'success' ? styles.success : styles.error
                }`}
              >
                {feedback.message}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Colonne droite - Companion */}
      <div className={styles.rightColumn}>
        <div className={styles.contactCompanion}>
          <div className={styles.companionContent}>
            <div className={styles.contactBadge}>Prêt à transformer ?</div>

            <h2 className={styles.companionTitle}>Discutons de Votre Projet</h2>

            <p className={styles.companionSubtitle}>
              Que vous ayez besoin d'une présence digitale professionnelle ou d'une
              transformation complète par l'IA, nous créons des solutions sur mesure qui
              propulsent votre croissance.
            </p>

            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>Consultation stratégique personnalisée</li>
              <li className={styles.featureItem}>Solutions adaptées à vos objectifs</li>
              <li className={styles.featureItem}>Expertise en web, SEO et automatisation IA</li>
              <li className={styles.featureItem}>Accompagnement de A à Z</li>
              <li className={styles.featureItem}>ROI mesurable et croissance durable</li>
            </ul>

            <div className={styles.trustIndicator}>
              <div className={styles.trustIcon}>⚡</div>
              <div className={styles.trustText}>
                <span className={styles.trustHighlight}>Réponse sous 24h</span> · Consultation
                gratuite · Sans engagement
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}