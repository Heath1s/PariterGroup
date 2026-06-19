import { useRegistration } from '../hooks/useRegistration';
import styles from './Hero.module.css';

export default function Hero() {
  // The hero begins misregistered at load and settles as you scroll through it.
  const ref = useRegistration<HTMLElement>({ start: 0, end: -0.7 });

  return (
    <section id="top" ref={ref} className={styles.hero} aria-labelledby="hero-h">
      <div className={`container ${styles.grid}`}>
        <div className={styles.lead}>
          <p className={`eyebrow ${styles.eyebrow}`}>Pariter Group</p>
          <h1 id="hero-h" className={`said ${styles.headline}`}>
            Your team's time belongs to better things.
          </h1>
          <p className={styles.sub}>
            We walk alongside established businesses — finding where the day leaks into
            admin, bringing your separate tools into one record, and giving your people
            back their hours.
          </p>
          <div className={styles.actions}>
            <a href="#contact" className="btn">Start with an audit</a>
            <a href="#approach" className="btn-quiet">
              See how it works <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* The protagonist motif: what's said vs. what's kept, with the gap
            a person currently crosses by hand. It closes as you scroll. */}
        <figure className={styles.pair} aria-label="What a business says, and what it keeps">
          <p className={`said ${styles.said}`}>
            “Shipped the Henderson order Tuesday — invoice to follow.”
          </p>
          <div className={styles.gap} aria-hidden="true">
            <span className={styles.gapNote}>someone re-keys it</span>
          </div>
          <div className="rule" aria-hidden="true" />
          <p className={`kept ${styles.kept}`}>
            INV-2041&nbsp;&nbsp;HENDERSON CO.&nbsp;&nbsp;$4,820.00
          </p>
        </figure>
      </div>
    </section>
  );
}
