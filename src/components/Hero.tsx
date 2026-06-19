import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-heading">
      <div className="container">
        <div className={styles.content}>
          <p className={styles.eyebrow}>Pariter Group</p>
          <h1 id="hero-heading" className={styles.headline}>
            Your team's time belongs to better things.
          </h1>
          <p className={styles.sub}>
            We walk alongside established businesses to find where the day gets eaten by
            admin — and then we fix it, piece by piece, at your pace.
          </p>
          <div className={styles.actions}>
            <a href="#contact" className={styles.btnPrimary}>Start with an audit</a>
            <a href="#approach" className={styles.btnSecondary}>
              See how it works
              <span aria-hidden="true" className={styles.arrow}>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
