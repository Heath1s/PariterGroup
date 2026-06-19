import { useRegistration } from '../hooks/useRegistration';
import styles from './Problem.module.css';

export default function Problem() {
  const ref = useRegistration<HTMLElement>();

  return (
    <section ref={ref} className={styles.problem} aria-labelledby="problem-h">
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">The problem</p>
        <h2 id="problem-h" className={`said ${styles.heading}`}>
          Your business keeps its truth in two places.
        </h2>
        <p className={styles.body}>
          What gets said lives in email, texts, and the call you took this morning. What
          gets kept lives in the books. Between them stands a person — retyping Tuesday's
          order into Thursday's ledger, copying figures from one screen to another, chasing
          the line that never made it across.
        </p>

        <div className={styles.gapBlock} aria-hidden="true">
          <span className={`said ${styles.gapSaid}`}>what's said</span>
          <div className={styles.gapField}>
            <span className={styles.gapNote}>the hours spent crossing the gap</span>
          </div>
          <div className="rule" />
          <span className={`kept ${styles.gapKept}`}>what's kept</span>
        </div>

        <p className={`said ${styles.close}`}>
          It shouldn't be a person's job to be the bridge.
        </p>
      </div>
    </section>
  );
}
