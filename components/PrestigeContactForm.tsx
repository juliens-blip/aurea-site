'use client';

import { useState } from 'react';
import styles from './PrestigeContactForm.module.css';

export default function PrestigeContactForm() {
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
      const res = await fetch('/api/prestige-contact', {
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
        message: 'Merci ! Vos informations ont bien été envoyées. Nous revenons vers vous sous 1 heure.',
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
          Initier votre premier contact — réponse sous <strong>&lt; 1h</strong>.
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
              {isSubmitting ? 'Envoi…' : 'Nous contacter'}
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
        <h2 className={styles.companionTitle}>Ce que vous obtenez</h2>
        <p className={styles.companionSubtitle}>
          Une intelligence artificielle dédiée qui automatise votre communication et libère 80% de votre temps de production.
        </p>

        <ul className={styles.featuresList}>
          <li className={styles.featureItem}>Posts personnalisés automatiques adaptés à votre image de marque</li>
          <li className={styles.featureItem}>Blog alimenté et entretenu par l'IA avec contenus SEO optimisés</li>
          <li className={styles.featureItem}>Newsletters intelligentes personnalisées pour votre clientèle</li>
          <li className={styles.featureItem}>Création de contenu digital premium pour tous vos réseaux</li>
          <li className={styles.featureItem}>Devis automatiques générés instantanément avec élégance</li>
          <li className={styles.featureItem}>Référencement naturel boosté grâce à vos publications IA</li>
        </ul>

        <div className={styles.testimonialCard}>
          <div className={styles.quoteIcon}>"</div>
          <p className={styles.testimonialText}>
            L'IA Prestige Plus a révolutionné notre communication. Nous avons récupéré 15 heures par semaine tout en multipliant par 3 notre production de contenu.
          </p>
          <div className={styles.testimonialAuthor}>
            <div className={styles.authorAvatar}>SF</div>
            <div className={styles.authorInfo}>
              <div className={styles.authorName}>Sophie Fontaine</div>
              <div className={styles.authorTitle}>Directrice Marketing</div>
              <div className={styles.stars}>★★★★★</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}