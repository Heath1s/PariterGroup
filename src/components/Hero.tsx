import Docket from './Docket';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-h">
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
            <a href="#contact" className="btn">
              Start with an audit <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href="#approach" className="btn-quiet">
              See how it works <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* The first order of the day. It would normally wait for a person to
            re-key it into the books; here it posts itself and clears. */}
        <div className={styles.stack}>
          <div className={styles.ghost} aria-hidden="true" />
          <Docket
            className={styles.docket}
            code="ORD-2041"
            kind="Order confirmation"
            said="Shipped the morning order — invoice to follow."
            rows={[
              { label: 'Invoiced', value: '$4,820.00' },
              { label: 'Posted to books', value: '06:41' },
            ]}
            stamp="Cleared"
            note="No one re-typed a thing. The order reached the books on its own."
            animateStamp
          />
        </div>
      </div>
    </section>
  );
}
