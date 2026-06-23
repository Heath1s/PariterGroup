import { useEnter } from '../hooks/useScrollMotion';
import about from '../content/about.json';
import styles from './About.module.css';

export default function About() {
  const ref = useEnter<HTMLElement>();

  return (
    <section id="about" ref={ref} className={styles.about} aria-labelledby="about-h">
      <div className={`container ${styles.grid}`}>
        <div className={styles.name}>
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 id="about-h" className={`said ${styles.heading} rise`}>{about.heading}</h2>
          <p className={styles.body}>{about.body1}</p>
          <p className={styles.body}>{about.body2}</p>
          <p className={`said ${styles.pull}`}>{about.pull}</p>
        </div>

        <aside className={styles.who}>
          <p className="eyebrow">{about.who.eyebrow}</p>
          <h3 className={`said ${styles.whoHeading}`}>{about.who.heading}</h3>
          <p className={styles.body}>{about.who.body}</p>
          <p className={`kept ${styles.whoNote}`}>{about.who.note}</p>
        </aside>
      </div>
    </section>
  );
}
