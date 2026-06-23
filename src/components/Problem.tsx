import { useEnter } from '../hooks/useScrollMotion';
import Docket from './Docket';
import styles from './Problem.module.css';

export default function Problem() {
  const ref = useEnter<HTMLElement>();

  return (
    <section ref={ref} className={styles.problem} aria-labelledby="problem-h">
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">The problem</p>
        <h2 id="problem-h" className={`said ${styles.heading} rise`}>
          Your business keeps its truth in two places.
        </h2>
        <p className={`${styles.body} rise`}>
          What gets said lives in email, texts, and the call you took this morning. What
          gets kept lives in the books. Between them stands a person — retyping Tuesday's
          order into Thursday's ledger, copying figures from one screen to another, chasing
          the line that never made it across.
        </p>

        {/* The line jams here: work piles up behind a hand that has to move it. */}
        <div className={styles.jam} aria-label="Work waiting to be entered by hand">
          <div className={styles.lane} aria-hidden="true" />
          <div className={styles.queue}>
            <span className={`${styles.ghost} ${styles.ghost2}`} aria-hidden="true" />
            <span className={`${styles.ghost} ${styles.ghost1}`} aria-hidden="true" />
            <Docket
              className={styles.front}
              code="ORD-2044"
              kind="Order confirmation"
              said="Shipped Tuesday — invoice to follow."
              stamp="Held"
              note="Waiting on someone to type it into the books."
              held
            />
            <span className={styles.count} aria-hidden="true">+3 waiting</span>
          </div>
          <div className={styles.stop} aria-hidden="true">
            <span className={styles.stopBar} />
            <span className={styles.stopLabel}>a person<br />re-keys it here</span>
          </div>
        </div>

        <p className={`said ${styles.close} rise`}>
          It shouldn't be a person's job to be the bridge.
        </p>
      </div>
    </section>
  );
}
