'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

type Feedback = { message: string; type: 'success' | 'error' | '' };

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    entreprise: '',
    website: '' // honeypot
  });

  const [feedback, setFeedback] = useState<Feedback>({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' });

    // Honeypot
    if (formData.website) return;

    // Validation simple
    if (!formData.nom || !formData.telephone || !formData.email || !formData.entreprise) {
      setFeedback({ message: 'Merci de remplir tous les champs obligatoires.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      // 👉 on appelle **notre** route API Next.js, pas Airtable directement
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone,
          entreprise: formData.entreprise
        })
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || 'Erreur API');
      }

      setFeedback({
        message: "Merci ! Vos informations ont bien été envoyées. Nous revenons vers vous sous 1 heure.",
        type: 'success'
      });

      setFormData({
        nom: '',
        telephone: '',
        email: '',
        entreprise: '',
        website: ''
      });
    } catch (error) {
      console.error('Erreur envoi formulaire:', error);
      setFeedback({ message: "Erreur lors de l'envoi. Veuillez réessayer.", type: 'error' });
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
              <label className={styles.qLabel} htmlFor="telephone">Téléphone *</label>
              <input
                id="telephone" name="telephone" type="tel" required placeholder="+33 6 12 34 56 78"
                className={styles.qInput} value={formData.telephone} onChange={handleChange} autoComplete="tel"
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
              <label className={styles.qLabel} htmlFor="entreprise">Nom Entreprise *</label>
              <input
                id="entreprise" name="entreprise" type="text" required placeholder="Votre société"
                className={styles.qInput} value={formData.entreprise} onChange={handleChange} autoComplete="organization"
              />
            </div>

            {/* Honeypot (anti-bot) */}
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

      {/* Colonne droite */}
      <div className={styles.rightColumn}>
        {/* … ton contenu à droite inchangé … */}
      </div>
    </div>
  );
}
