'use client';

import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 30;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbarContainer}>
        <a href="/" className={styles.navbarLogo}>
          <img src="https://www.dropbox.com/scl/fi/ele5d4wemwffg6pnfuul9/unnamed-9.jpg?rlkey=cj20kes5ap1fio2qrzq5wg1em&st=tbimi3e4&dl=1" alt="Logo Aurea" />
        </a>

        <div 
          className={`${styles.navbarToggle} ${mobileMenuOpen ? styles.active : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`${styles.navbarMenu} ${mobileMenuOpen ? styles.active : ''}`}>
          <li 
            className={`${styles.navbarItem} ${styles.hasDropdown} ${dropdownOpen ? styles.active : ''}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className={styles.navbarDropdownToggle}>
              <span>Nos Packs</span>
              <span className={styles.dropdownArrow}>▼</span>
            </div>
            <ul className={styles.navbarDropdown}>
              <li className={styles.navbarDropdownItem}>
                <a href="/packessentiel" className={styles.navbarDropdownLink}>Pack Essentiel</a>
              </li>
              <li className={styles.navbarDropdownItem}>
                <a href="/packprestige" className={styles.navbarDropdownLink}>Pack Prestige</a>
              </li>
              <li className={styles.navbarDropdownItem}>
                <a href="/packpremium" className={styles.navbarDropdownLink}>Pack Premium</a>
              </li>
            </ul>
          </li>

          <li className={styles.navbarItem}>
            <a 
              href="#comparatif" 
              className={styles.navbarLink}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('comparatif');
              }}
            >
              Comparatif
            </a>
          </li>

          {/* ← NOUVEAU LIEN ACTUALITÉS */}
          <li className={styles.navbarItem}>
            <a 
              href="/blog" 
              className={styles.navbarLink}
            >
              Actualités
            </a>
          </li>
          {/* ← */}

          <li className={styles.navbarItem}>
            <a 
              href="#contact" 
              className={styles.navbarCta}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}