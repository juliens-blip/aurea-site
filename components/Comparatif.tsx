'use client';

import { useState } from 'react';
import styles from './Comparatif.module.css';

type Filter = 'all' | 'communication' | 'automation' | 'creation';

export default function Comparatif() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const handleFilterClick = (filter: Filter) => setActiveFilter(filter);

  return (
    <section className={styles.comparisonSection} id="comparatif">
      <div className={styles.container}>
        <h2 className={styles.comparisonTitle}>Comparaison des Offres</h2>

        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => handleFilterClick('all')}
          >
            Tous les packs
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'communication' ? styles.active : ''}`}
            onClick={() => handleFilterClick('communication')}
          >
            Communication & Stratégie
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'automation' ? styles.active : ''}`}
            onClick={() => handleFilterClick('automation')}
          >
            Automatisation & IA
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'creation' ? styles.active : ''}`}
            onClick={() => handleFilterClick('creation')}
          >
            Création & Contenu
          </button>
        </div>

        <div className={styles.comparisonTable}>
          <div className={styles.tableWrapper}>
            {/* ⬇️ ICI : applique la classe .table du module */}
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Services / Packs</th>
                  <th>Essentiel</th>
                  <th>Prestige</th>
                  <th>Signature</th>
                </tr>
              </thead>
              <tbody>
                {/* COMMUNICATION & STRATÉGIE */}
                <tr
                  data-category="communication"
                  className={activeFilter === 'all' || activeFilter === 'communication' ? '' : styles.hidden}
                >
                  <td className={styles.featureName}>Stratégie éditoriale IA</td>
                  <td><span className={styles.check}>✓</span> (base)</td>
                  <td><span className={styles.check}>✓</span> (personnalisée)</td>
                  <td><span className={styles.check}>✓</span> (continue)</td>
                </tr>
                <tr
                  data-category="communication"
                  className={activeFilter === 'all' || activeFilter === 'communication' ? '' : styles.hidden}
                >
                  <td className={styles.featureName}>Publicité Meta / Google</td>
                  <td><span className={styles.cross}>–</span></td>
                  <td><span className={styles.check}>✓</span> (option)</td>
                  <td><span className={styles.check}>✓</span> (incluse)</td>
                </tr>
                <tr
                  data-category="communication"
                  className={activeFilter === 'all' || activeFilter === 'communication' ? '' : styles.hidden}
                >
                  <td className={styles.featureName}>Chef de projet dédié</td>
                  <td><span className={styles.cross}>–</span></td>
                  <td><span className={styles.check}>✓</span></td>
                  <td><span className={styles.check}>✓</span></td>
                </tr>
                <tr
                  data-category="communication"
                  className={activeFilter === 'all' || activeFilter === 'communication' ? '' : styles.hidden}
                >
                  <td className={styles.featureName}>Support prioritaire</td>
                  <td><span className={styles.cross}>–</span></td>
                  <td><span className={styles.check}>✓</span></td>
                  <td><span className={styles.check}>✓</span></td>
                </tr>

                {/* AUTOMATISATION & IA */}
                <tr
                  data-category="automation"
                  className={activeFilter === 'all' || activeFilter === 'automation' ? '' : styles.hidden}
                >
                  <td className={styles.featureName}>Posts réseaux sociaux automatisés</td>
                  <td><span className={styles.check}>✓</span> (3/semaine)</td>
                  <td><span className={styles.check}>✓</span> (5/semaine)</td>
                  <td><span className={styles.check}>✓</span> (quotidien)</td>
                </tr>
                <tr
                  data-category="automation"
                  className={activeFilter === 'all' || activeFilter === 'automation' ? '' : styles.hidden}
                >
                  <td className={styles.featureName}>Blog alimenté par IA</td>
                  <td><span className={styles.check}>✓</span> (2/mois)</td>
                  <td><span className={styles.check}>✓</span> (4/mois)</td>
                  <td><span className={styles.check}>✓</span> (8/mois)</td>
                </tr>
                <tr
                  data-category="automation"
                  className={activeFilter === 'all' || activeFilter === 'automation' ? '' : styles.hidden}
                >
                  <td className={styles.featureName}>Newsletters personnalisées</td>
                  <td><span className={styles.check}>✓</span> (1/mois)</td>
                  <td><span className={styles.check}>✓</span> (2/mois)</td>
                  <td><span className={styles.check}>✓</span> (4/mois)</td>
                </tr>
                <tr
                  data-category="automation"
                  className={activeFilter === 'all' || activeFilter === 'automation' ? '' : styles.hidden}
                >
                  <td className={styles.featureName}>Devis automatiques</td>
                  <td><span className={styles.cross}>–</span></td>
                  <td><span className={styles.check}>✓</span></td>
                  <td><span className={styles.check}>✓</span></td>
                </tr>

                {/* CRÉATION & CONTENU */}
                <tr
                  data-category="creation"
                  className={activeFilter === 'all' || activeFilter === 'creation' ? '' : styles.hidden}
                >
                  <td className={styles.featureName}>Création visuels premium</td>
                  <td><span className={styles.check}>✓</span> (basique)</td>
                  <td><span className={styles.check}>✓</span> (avancé)</td>
                  <td><span className={styles.check}>✓</span> (illimité)</td>
                </tr>
                <tr
                  data-category="creation"
                  className={activeFilter === 'all' || activeFilter === 'creation' ? '' : styles.hidden}
                >
                  <td className={styles.featureName}>Identité visuelle complète</td>
                  <td><span className={styles.cross}>–</span></td>
                  <td><span className={styles.check}>✓</span></td>
                  <td><span className={styles.check}>✓</span></td>
                </tr>
                <tr
                  data-category="creation"
                  className={activeFilter === 'all' || activeFilter === 'creation' ? '' : styles.hidden}
                >
                  <td className={styles.featureName}>Direction artistique continue</td>
                  <td><span className={styles.cross}>–</span></td>
                  <td><span className={styles.cross}>–</span></td>
                  <td><span className={styles.check}>✓</span></td>
                </tr>
                <tr
                  data-category="creation"
                  className={activeFilter === 'all' || activeFilter === 'creation' ? '' : styles.hidden}
                >
                  <td className={styles.featureName}>Optimisation SEO continue</td>
                  <td><span className={styles.check}>✓</span></td>
                  <td><span className={styles.check}>✓</span></td>
                  <td><span className={styles.check}>✓</span></td>
                </tr>

                {/* CTA ROW */}
                <tr className={styles.ctaRow}>
                  <td className={styles.featureName} style={{ fontWeight: 700, color: '#C9B17E' }}>
                    Découvrir le pack
                  </td>
                  <td><a href="/packessentiel" className={styles.ctaBtn}>Voir Essentiel</a></td>
                  <td><a href="/packprestige" className={styles.ctaBtn}>Voir Prestige</a></td>
                  <td><a href="/packpremium" className={styles.ctaBtn}>Voir Signature</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className={styles.note}>
          Pack Essentiel : gestion simplifiée, contenu IA automatisé |
          Pack Prestige : identité visuelle complète, contenus sur-mesure |
          Pack Prenium : direction artistique continue, automatisation 24/7
        </p>
      </div>
    </section>
  );
}
