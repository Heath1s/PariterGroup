import { useEnter } from '../hooks/useScrollMotion';
import caps from '../content/capabilities.json';
import styles from './Capabilities.module.css';

export default function Capabilities() {
  const ref = useEnter<HTMLElement>();

  return (
    <section id="capabilities" ref={ref} className={styles.caps} aria-labelledby="caps-h">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">{caps.eyebrow}</p>
          <h2 id="caps-h" className={`said ${styles.heading} rise`}>{caps.heading}</h2>
          <p className={`${styles.sub} rise`}>{caps.sub}</p>
        </header>

        <ul className={styles.grid}>
          {caps.items.map((it) => (
            <li key={it.title} className={`${styles.card} rise`}>
              <span className={`kept ${styles.tick}`} aria-hidden="true">✓ {it.tick}</span>
              <div className="rule" aria-hidden="true" />
              <h3 className={`said ${styles.title}`}>{it.title}</h3>
              <p className={styles.body}>{it.body}</p>
            </li>
          ))}
        </ul>

        {/* The forward register: what one record makes possible. */}
        <div className={styles.vision}>
          <p className="eyebrow">{caps.vision.eyebrow}</p>
          <h3 className={`said ${styles.visionHeading}`}>{caps.vision.heading}</h3>
          <p className={styles.visionBody}>{caps.vision.body}</p>
          <p className={`said ${styles.visionPull}`}>{caps.vision.pull}</p>
        </div>

        {/* What we're not — the three alternatives a buyer weighs us against. */}
        <div className={styles.diff}>
          <p className="eyebrow">{caps.alternatives.eyebrow}</p>
          <ul className={styles.diffGrid}>
            {caps.alternatives.items.map((a) => (
              <li key={a.tick}>
                <span className={`kept ${styles.diffTick}`} aria-hidden="true">{a.tick}</span>
                <p className={styles.diffBody}>{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
