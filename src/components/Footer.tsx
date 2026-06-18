import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <a href="#top" className={styles.logo} aria-label="Pariter Group — back to top">
            <span className={styles.logoDisplay}>Pariter</span>
            <span className={styles.logoSans}>&nbsp;Group</span>
          </a>
          <p className={styles.tagline}>Side by side, at your pace.</p>
        </div>

        <div className={styles.right}>
          <a href="mailto:hello@paritergroup.com" className={styles.email}>
            hello@paritergroup.com
          </a>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Pariter Group
          </p>
        </div>
      </div>
    </footer>
  );
}
