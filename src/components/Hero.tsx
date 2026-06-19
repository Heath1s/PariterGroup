import { useInView } from '../hooks/useInView';
import styles from './Hero.module.css';

export default function Hero() {
  const { ref, inView } = useInView(0.08);

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-heading">
      <div className="container">
        <div className={styles.grid}>
          <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`${styles.content} reveal ${inView ? 'in-view' : ''}`}
          >
            <p className={`section-eyebrow ${styles.eyebrow}`}>Pariter Group</p>
            <h1 id="hero-heading" className={styles.headline}>
              Your team's time belongs to better things.
            </h1>
            <p
              className={styles.subhead}
              style={{ transitionDelay: '200ms' }}
            >
              We walk alongside established businesses — finding where admin eats the day,
              connecting the tools, and freeing your people for work that moves the company forward.
            </p>
            <div
              className={styles.cta}
              style={{ transitionDelay: '350ms' }}
            >
              <a href="#contact" className={styles.ctaButton}>Start with an audit</a>
            </div>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <svg
              width="120"
              height="200"
              viewBox="0 0 120 200"
              fill="none"
              className={styles.decorSvg}
            >
              <rect x="20" y="20" width="8" height="160" rx="4" fill="currentColor" />
              <rect x="50" y="50" width="8" height="110" rx="4" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
