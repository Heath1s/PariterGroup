import Docket from './Docket';
import hero from '../content/hero.json';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-h">
      <div className={`container ${styles.grid}`}>
        <div className={styles.lead}>
          <p className={`eyebrow ${styles.eyebrow}`}>{hero.eyebrow}</p>
          <h1 id="hero-h" className={`said ${styles.headline}`}>{hero.headline}</h1>
          <p className={styles.sub}>{hero.sub}</p>
          <div className={styles.actions}>
            <a href="#contact" className="btn">
              {hero.ctaPrimary} <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href="#approach" className="btn-quiet">
              {hero.ctaSecondary} <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* The first order of the day. It would normally wait for a person to
            re-key it into the books; here it posts itself and clears. */}
        <div className={styles.stack}>
          <div className={styles.ghost} aria-hidden="true" />
          <Docket className={styles.docket} {...hero.docket} animateStamp />
        </div>
      </div>
    </section>
  );
}
