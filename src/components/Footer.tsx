import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.grid}>
          {/* Col 1: Brand */}
          <div className={styles.brand}>
            <a href="#top" className={styles.logo} aria-label="Pariter Group — back to top">
              <span className={styles.logoDisplay}>Pariter</span>
              <span className={styles.logoSans}>&nbsp;Group</span>
            </a>
            <p className={styles.tagline}>Side by side, at your pace.</p>
          </div>

          {/* Col 2: Navigation */}
          <div className={styles.col}>
            <p className={styles.colHeader}>Navigation</p>
            <ul className={styles.linkList} role="list">
              <li><a href="#approach" className={styles.link}>Approach</a></li>
              <li><a href="#capabilities" className={styles.link}>What We Do</a></li>
              <li><a href="#about" className={styles.link}>About</a></li>
              <li><a href="#contact" className={styles.link}>Start with an audit</a></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className={styles.col}>
            <p className={styles.colHeader}>Contact</p>
            <a href="mailto:hello@paritergroup.com" className={styles.emailLink}>
              hello@paritergroup.com
            </a>
          </div>

          {/* Col 4: Legal */}
          <div className={styles.col}>
            <p className={styles.colHeader}>Legal</p>
            <p className={styles.legal}>© 2026 Pariter Group.</p>
            <p className={styles.legal}>All rights reserved.</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.bottomCopy}>© 2026 Pariter Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
