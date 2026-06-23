import { useEnter } from '../hooks/useScrollMotion';
import Docket from './Docket';
import problem from '../content/problem.json';
import styles from './Problem.module.css';

export default function Problem() {
  const ref = useEnter<HTMLElement>();

  return (
    <section ref={ref} className={styles.problem} aria-labelledby="problem-h">
      <div className={`container ${styles.inner}`}>
        <p className="eyebrow">{problem.eyebrow}</p>
        <h2 id="problem-h" className={`said ${styles.heading} rise`}>{problem.heading}</h2>
        <p className={`${styles.body} rise`}>{problem.body}</p>

        {/* The line jams here: work piles up behind a hand that has to move it. */}
        <div className={styles.jam} aria-label="Work waiting to be entered by hand">
          <div className={styles.lane} aria-hidden="true" />
          <div className={styles.queue}>
            <span className={`${styles.ghost} ${styles.ghost2}`} aria-hidden="true" />
            <span className={`${styles.ghost} ${styles.ghost1}`} aria-hidden="true" />
            <Docket className={styles.front} {...problem.docket} held />
            <span className={styles.count} aria-hidden="true">{problem.count}</span>
          </div>
          <div className={styles.stop} aria-hidden="true">
            <span className={styles.stopBar} />
            <span className={styles.stopLabel}>{problem.stopLabel}</span>
          </div>
        </div>

        <p className={`said ${styles.close} rise`}>{problem.close}</p>
      </div>
    </section>
  );
}
