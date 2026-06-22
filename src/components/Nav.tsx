import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label="Pariter Group — home">
          <span className={styles.mark}>
            <span className={styles.markSaid}>Pariter</span>
            <span className={styles.markGroup}>&nbsp;Group</span>
          </span>
          <span className={styles.markRule} aria-hidden="true" />
        </a>

        <nav className={styles.center} aria-label="Primary">
          <ul className={styles.links}>
            <li><a href="#approach" className={styles.link}>Approach</a></li>
            <li><a href="#capabilities" className={styles.link}>What We Do</a></li>
            <li><a href="#security" className={styles.link}>Security</a></li>
            <li><a href="#about" className={styles.link}>About</a></li>
          </ul>
        </nav>

        <a href="#contact" className={`btn ${styles.cta}`}>Start with an audit</a>

        <button
          className={styles.burger}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span className={`${styles.bar} ${open ? styles.b1 : ''}`} />
          <span className={`${styles.bar} ${open ? styles.b2 : ''}`} />
          <span className={`${styles.bar} ${open ? styles.b3 : ''}`} />
        </button>
      </div>

      {open && (
        <div className={styles.mobile}>
          <ul>
            <li><a href="#approach" className={styles.mLink} onClick={close}>Approach</a></li>
            <li><a href="#capabilities" className={styles.mLink} onClick={close}>What We Do</a></li>
            <li><a href="#security" className={styles.mLink} onClick={close}>Security</a></li>
            <li><a href="#about" className={styles.mLink} onClick={close}>About</a></li>
            <li><a href="#contact" className={`btn ${styles.mCta}`} onClick={close}>Start with an audit</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
