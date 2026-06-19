import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logo} aria-label="Pariter Group — home">
          <span className={styles.logoDisplay}>Pariter</span>
          <span className={styles.logoSans}>&nbsp;Group</span>
        </a>

        <nav className={styles.centerNav} aria-label="Main navigation">
          <ul className={styles.links} role="list">
            <li><a href="#approach" className={styles.link} onClick={close}>Approach</a></li>
            <li><a href="#capabilities" className={styles.link} onClick={close}>What We Do</a></li>
            <li><a href="#about" className={styles.link} onClick={close}>About</a></li>
          </ul>
        </nav>

        <div className={styles.right}>
          <a href="#contact" className={styles.cta}>Start with an audit</a>
        </div>

        <button
          className={styles.menuBtn}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <ul role="list">
            <li><a href="#approach" className={styles.mobileLink} onClick={close}>Approach</a></li>
            <li><a href="#capabilities" className={styles.mobileLink} onClick={close}>What We Do</a></li>
            <li><a href="#about" className={styles.mobileLink} onClick={close}>About</a></li>
            <li>
              <a href="#contact" className={styles.mobileCta} onClick={close}>
                Start with an audit
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
