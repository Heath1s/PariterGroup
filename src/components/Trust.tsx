import { useEnter } from '../hooks/useScrollMotion';
import trust from '../content/trust.json';
import styles from './Trust.module.css';

export default function Trust() {
  const ref = useEnter<HTMLElement>();

  return (
    <section id="security" ref={ref} data-ground="dark" className={styles.trust} aria-labelledby="trust-h">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">{trust.eyebrow}</p>
          <h2 id="trust-h" className={`said ${styles.heading} rise`}>{trust.heading}</h2>
          <p className={styles.sub}>{trust.sub}</p>
        </header>

        <ul className={styles.grid}>
          {trust.points.map((p) => (
            <li key={p.k} className={styles.item}>
              <span className={`kept ${styles.tick}`} aria-hidden="true">{p.k}</span>
              <h3 className={`said ${styles.title}`}>{p.t}</h3>
              <p className={styles.body}>{p.b}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
