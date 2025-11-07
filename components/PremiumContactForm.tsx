'use client';

import { useState } from 'react';
import styles from './PremiumContactForm.module.css';

export default function PremiumContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    website: '' // honeypot
  });

  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' });

    // Honeypot check
    if (formData.website) return;

    // Validation
    if (!formData.nom || !formData.email || !formData.telephone || !formData.entreprise) {
      setFeedback({
        message: 'Merci de remplir tous les champs obligatoires.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/premium-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          entreprise: formData.entreprise
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erreur lors de l\'envoi');
      }

      setFeedback({
        message: 'Merci ! Vous êtes à un pas de vos premiers clients digitaux.',
        type: 'success'
      });
      
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        entreprise: '',
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
      <div className={styles.leftColumn}>
        <h2 className={styles.qTitle}>Prenons contact</h2>
        <p className={styles.qSubtitle}>
          Vous êtes à un pas de vos premiers clients digitaux.
        </p>

        <div className={styles.questionnaireCard}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.qGroup}>
              <label className={styles.qLabel} htmlFor="nom">Nom *</label>
              <input
                id="nom" name="nom" type="text" required placeholder="Votre nom"
                className={styles.qInput} value={formData.nom} onChange={handleChange} autoComplete="name"
              />
            </div>

            <div className={styles.qGroup}>
              <label className={styles.qLabel} htmlFor="email">Email *</label>
              <input
                id="email" name="email" type="email" required placeholder="vous@exemple.com"
                className={styles.qInput} value={formData.email} onChange={handleChange} autoComplete="email"
              />
            </div>

            <div className={styles.qGroup}>
              <label className={styles.qLabel} htmlFor="telephone">Téléphone *</label>
              <input
                id="telephone" name="telephone" type="tel" required placeholder="+33 6 12 34 56 78"
                className={styles.qInput} value={formData.telephone} onChange={handleChange} autoComplete="tel"
              />
            </div>

            <div className={styles.qGroup}>
              <label className={styles.qLabel} htmlFor="entreprise">Nom Entreprise *</label>
              <input
                id="entreprise" name="entreprise" type="text" required placeholder="Votre société"
                className={styles.qInput} value={formData.entreprise} onChange={handleChange} autoComplete="organization"
              />
            </div>

            {/* Honeypot */}
            <input
              type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off"
              value={formData.website} onChange={handleChange}
            />

            <button className={styles.qSubmit} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi…' : 'prendre contact'}
            </button>

            <p className={styles.qLegal}>
              En envoyant ce formulaire vous acceptez notre politique de confidentialité.
            </p>

            {feedback.message && (
              <div className={`${styles.qFeedback} ${feedback.type === 'success' ? styles.success : styles.error}`}>
                {feedback.message}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Companion à droite */}
      <div className={styles.rightColumn}>
        <div className={styles.prestigeBadge}>PROGRAMME ELITE</div>
        <h2 className={styles.companionTitle}>Une Transformation Digitale Complète</h2>
        <p className={styles.companionSubtitle}>
          Un écosystème d'excellence où l'intelligence artificielle et l'automatisation propulsent votre entreprise vers de nouveaux sommets.
        </p>

        <ul className={styles.featuresList}>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>✓</span>
            Écosystème digital propriétaire avec architecture IA sur mesure
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>✓</span>
            Équipe d'experts senior dédiée pendant 12 mois
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>✓</span>
            Automatisation complète de vos processus métier
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>✓</span>
            Tableau de bord décisionnel avec analytics prédictifs
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>✓</span>
            Infrastructure sécurisée de niveau bancaire
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>✓</span>
            Formation VIP et change management personnalisé
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>✓</span>
            Support illimité et optimisations continues
          </li>
          <li className={styles.featureItem}>
            <span className={styles.featureIcon}>✓</span>
            Consultation stratégique mensuelle avec le CEO
          </li>
        </ul>

        <div className={styles.testimonialCard}>
          <div className={styles.quoteIcon}>"</div>
          <p className={styles.testimonialText}>
            Cette transformation a redéfini notre entreprise. En 6 mois, nous avons automatisé 80% de nos processus, triplé notre productivité et multiplié notre chiffre d'affaires par 2,5. L'équipe dédiée nous a accompagnés à chaque étape avec un professionnalisme exceptionnel. Un investissement stratégique qui a dépassé toutes nos espérances.
          </p>
          <div className={styles.testimonialAuthor}>
            <div className={styles.authorAvatar}>PM</div>
            <div className={styles.authorInfo}>
              <div className={styles.authorName}>Philippe Marchand</div>
              <div className={styles.authorTitle}>PDG, TechCorp International</div>
              <div className={styles.stars}>★★★★★</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}