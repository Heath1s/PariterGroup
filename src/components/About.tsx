import { useRegistration } from '../hooks/useRegistration';
import styles from './About.module.css';

export default function About() {
  const ref = useRegistration<HTMLElement>();

  return (
    <section id="about" ref={ref} className={styles.about} aria-labelledby="about-h">
      <div className={`container ${styles.grid}`}>
        <div className={styles.name}>
          <p className="eyebrow">About</p>
          <h2 id="about-h" className={`said ${styles.heading}`}>
            The name is the promise.
          </h2>
          <p className={styles.body}>
            Pariter is Latin for <em>side by side</em> — as equals, at the same pace. It
            shares a root with <em>par</em> and <em>pair</em>, so even without the Latin,
            most people already feel the meaning: equal footing, moving in step.
          </p>
          <p className={styles.body}>
            That's not a tagline. It's how the firm works. We don't sit above you as a
            vendor who hands over a system and moves on. We come alongside — at your pace,
            in your business — and we stay as the work compounds.
          </p>
          <p className={`said ${styles.pull}`}>
            We grow when you grow. The relationship is the product.
          </p>
        </div>

        <aside className={styles.who}>
          <p className="eyebrow">Who we work with</p>
          <h3 className={`said ${styles.whoHeading}`}>
            Established businesses running on hard work
          </h3>
          <p className={styles.body}>
            We're built for companies in the $5M–$30M range — distribution, trades,
            logistics, and the like. Not software companies. Places where good people lose
            hours to admin that better-connected tools should be handling.
          </p>
          <p className={`kept ${styles.whoNote}`}>side by side · as equals · at your pace</p>
        </aside>
      </div>
    </section>
  );
}
