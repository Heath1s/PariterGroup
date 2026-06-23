import general from '../content/general.json';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo" data-ground="dark">
      <div className="container">
        <div className={styles.rule} aria-hidden="true" />

        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="#top" className={styles.mark} aria-label="Pariter Group — back to top">
              <span className={styles.markSaid}>Pariter</span>
              <span className={styles.markGroup}>&nbsp;Group</span>
            </a>
            <p className={styles.tagline}>{general.footerTagline}</p>
          </div>

          <nav className={styles.col} aria-label="Footer navigation">
            <p className={styles.colHead}>Navigation</p>
            <ul>
              {general.navLinks.map((l) => (
                <li key={l.href}><a href={l.href} className={styles.link}>{l.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <p className={styles.colHead}>Contact</p>
            <a href={`mailto:${general.footerEmail}`} className={styles.link}>{general.footerEmail}</a>
          </div>

          <div className={styles.col}>
            <p className={styles.colHead}>Legal</p>
            <p className={styles.legal}>{general.footerLegal1}</p>
            <p className={styles.legal}>{general.footerLegal2}</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.bottomCopy}>{general.footerBottom}</p>
        </div>
      </div>
    </footer>
  );
}
