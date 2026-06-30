import { useState, useEffect } from 'react';
import general from '../content/general.json';
import styles from './Nav.module.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Stay transparent over the full-height hero, go solid once past it.
    const h = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    h();
    window.addEventListener('scroll', h, { passive: true });
    window.addEventListener('resize', h, { passive: true });
    return () => {
      window.removeEventListener('scroll', h);
      window.removeEventListener('resize', h);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.nav} ${scrolled || open ? styles.scrolled : ''}`} role="banner">
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
            {general.navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className={styles.link}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className={`btn ${styles.cta}`}>{general.navCta}</a>

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
            {general.navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={styles.mLink} onClick={close}>{l.label}</a>
              </li>
            ))}
            <li>
              <a href="#contact" className={`btn ${styles.mCta}`} onClick={close}>{general.navCta}</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
