import { useEnter } from '../hooks/useScrollMotion';
import testimonials from '../content/testimonials.json';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const ref = useEnter<HTMLElement>();

  return (
    <section id="proof" ref={ref} className={styles.proof} aria-labelledby="proof-h">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">{testimonials.eyebrow}</p>
          <h2 id="proof-h" className={`said ${styles.heading} rise`}>{testimonials.heading}</h2>
          <p className={`${styles.note} rise`}>{testimonials.note}</p>
        </header>

        <ul className={styles.grid}>
          {testimonials.quotes.map((q) => (
            <li key={q.where} className={`${styles.card} rise`}>
              <p className={`kept ${styles.sector}`}>{q.who} · {q.where}</p>
              <blockquote className={`said ${styles.quote}`}>{q.body}</blockquote>
              <div className={styles.resultRow}>
                <span className={styles.resultBar} aria-hidden="true" />
                <span className={`kept ${styles.result}`}>{q.result}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
