import { useEnter } from '../hooks/useScrollMotion';
import approach from '../content/approach.json';
import styles from './Approach.module.css';

export default function Approach() {
  const ref = useEnter<HTMLElement>();

  return (
    <section id="approach" ref={ref} className={styles.approach} aria-labelledby="approach-h">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">{approach.eyebrow}</p>
          <h2 id="approach-h" className={`said ${styles.heading} rise`}>{approach.heading}</h2>
          <p className={`${styles.sub} rise`}>{approach.sub}</p>
        </header>

        <ol className={styles.route}>
          {approach.steps.map((s) => (
            <li key={s.n} className={`${styles.stop} rise`}>
              <div className={styles.node}>
                <span className={`kept ${styles.num}`}>{s.n}</span>
              </div>
              <h3 className={`said ${styles.title}`}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
