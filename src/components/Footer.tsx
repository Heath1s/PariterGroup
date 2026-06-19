import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.rule} aria-hidden="true" />

        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="#top" className={styles.mark} aria-label="Pariter Group — back to top">
              <span className={styles.markSaid}>Pariter</span>
              <span className={styles.markGroup}>&nbsp;Group</span>
            </a>
            <p className={styles.tagline}>Side by side, at your pace.</p>
          </div>

          <nav className={styles.col} aria-label="Footer navigation">
            <p className={styles.colHead}>Navigation</p>
            <ul>
              <li><a href="#approach" className={styles.link}>Approach</a></li>
              <li><a href="#capabilities" className={styles.link}>What We Do</a></li>
              <li><a href="#about" className={styles.link}>About</a></li>
              <li><a href="#contact" className={styles.link}>Start with an audit</a></li>
            </ul>
          </nav>

          <div className={styles.col}>
            <p className={styles.colHead}>Contact</p>
            <a href="mailto:hello@paritergroup.com" className={styles.link}>hello@paritergroup.com</a>
          </div>

          <div className={styles.col}>
            <p className={styles.colHead}>Legal</p>
            <p className={styles.legal}>© 2026 Pariter Group</p>
            <p className={styles.legal}>All rights reserved.</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.bottomCopy}>Established businesses, freed from busywork.</p>
        </div>
      </div>
    </footer>
  );
}
