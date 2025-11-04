'use client';

import { useState } from 'react';
import styles from './LandingContactForm.module.css';

export default function LandingContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    website: '' // Honeypot
  });
  
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.message) {
      setFeedback({
        message: 'Merci de remplir tous les champs obligatoires.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('https://aurea-site-5rppz04ag-juliensimard31-7076s-projects.vercel.app/api/landing-contact', {
        .vercel.app', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: formData.company,
    message: formData.message
  })
});

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erreur lors de l\'envoi');
      }

      setFeedback({
        message: 'Merci ! Votre message a bien été envoyé. Nous vous répondons sous 24h.',
        type: 'success'
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        website: ''
      });
    } catch (err: any) {
      console.error('Erreur formulaire:', err);
      setFeedback({
        message: err.message || 'Erreur lors de l\'envoi. Veuillez réessayer.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.mainContainer} id="contact">
      {/* Colonne droite - Companion */}
      <div className={styles.leftColumn}>
        <div className={styles.contactCompanion}>
          <div className={styles.companionContent}>
            <div className={styles.contactBadge}>Transformez votre présence digitale</div>

            <h2 className={styles.companionTitle}>Parlons de Votre Vision</h2>

            <p className={styles.companionSubtitle}>
              Chaque projet est unique. Que vous souhaitiez créer une vitrine digitale d'exception, 
              optimiser votre visibilité SEO, ou automatiser vos processus avec l'IA, nous concevons 
              des solutions qui amplifient votre impact et accélèrent votre croissance.
            </p>

            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>Audit gratuit de votre présence digitale</li>
              <li className={styles.featureItem}>Stratégie personnalisée selon vos objectifs</li>
              <li className={styles.featureItem}>Solutions web, SEO, IA et automatisation</li>
              <li className={styles.featureItem}>Accompagnement sur mesure de bout en bout</li>
              <li className={styles.featureItem}>Résultats mesurables et ROI optimisé</li>
            </ul>

            <div className={styles.trustIndicator}>
              <div className={styles.trustIcon}>✨</div>
              <div className={styles.trustText}>
                <span className={styles.trustHighlight}>Réponse garantie sous 24h</span> · 
                Consultation offerte · Sans engagement
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Colonne gauche - Formulaire */}
      <div className={styles.rightColumn}>
        <h2 className={styles.qTitle}>Envoyez-nous un message</h2>
        <p className={styles.qSubtitle}>
          Décrivez votre projet — nous revenons vers vous rapidement.
        </p>

        <div className={styles.questionnaireCard}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.qGroup}>
              <label className={styles.qLabel} htmlFor="name">
                Nom complet *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Votre nom"
                className={styles.qInput}
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
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
              <label className={styles.qLabel} htmlFor="phone">
                Téléphone *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+33 6 12 34 56 78"
                className={styles.qInput}
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </div>

            <div className={styles.qGroup}>
              <label className={styles.qLabel} htmlFor="company">
                Nom de l'entreprise *
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                placeholder="Votre société"
                className={styles.qInput}
                value={formData.company}
                onChange={handleChange}
                autoComplete="organization"
              />
            </div>

            <div className={styles.qGroup}>
              <label className={styles.qLabel} htmlFor="message">
                Objet de votre contact *
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Décrivez brièvement votre projet ou vos besoins..."
                className={styles.qTextarea}
                value={formData.message}
                onChange={handleChange}
                rows={5}
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
              {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
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
    </div>
  );
}