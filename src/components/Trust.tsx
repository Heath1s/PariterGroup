import { useInView } from '../hooks/useInView';
import styles from './Trust.module.css';

export default function Trust() {
  const { ref: leftRef, inView: leftIn } = useInView(0.1);
  const { ref: rightRef, inView: rightIn } = useInView(0.1);

  return (
    <section id="about" className={styles.trust} aria-labelledby="trust-heading">
      <div className="container">
        <div className={styles.grid}>
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            className={`${styles.col} reveal ${leftIn ? 'in-view' : ''}`}
          >
            <p className={`section-eyebrow ${styles.eyebrow}`}>Who we work with</p>
            <h2 id="trust-heading" className={styles.heading}>
              Established businesses running on hard work
            </h2>
            <p className={styles.copy}>
              We're built for companies in the $5M–$30M range — distribution, trades, logistics,
              and similar. Not software companies. Places where good people are losing hours to
              admin that better-connected tools should be handling.
            </p>
            <blockquote className={styles.callout}>
              <em>
                "Pariter — Latin for side by side, as equals, at the same pace. That's not a
                tagline. It's the name of the firm and the reason it exists."
              </em>
            </blockquote>
          </div>

          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            className={`${styles.col} reveal ${rightIn ? 'in-view' : ''}`}
            style={{ transitionDelay: '120ms' }}
          >
            <p className={`section-eyebrow ${styles.eyebrow}`}>About</p>
            <h2 className={styles.heading}>The name means what it says</h2>
            <p className={styles.copy}>
              We don't sit above you as a vendor. We come alongside — at your pace, in your
              business — and we stay on as the work compounds. The relationship is the product.
            </p>
            <p className={`${styles.copy} ${styles.copySecond}`}>
              Pariter shares a root with par and pair. Even without the Latin, most people already
              sense the meaning: equal footing, moving in step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
