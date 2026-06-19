import { useRegistration } from '../hooks/useRegistration';
import styles from './Approach.module.css';

const steps = [
  {
    n: '01',
    title: 'We find the waste.',
    body: 'A paid audit goes deep into where your team\'s time actually goes. You get a clear, plain-English picture of what\'s being lost each week — and what it costs you over a year.',
  },
  {
    n: '02',
    title: 'We eliminate it.',
    body: 'We bring your tools into one record, so what\'s said reaches what\'s kept without a person in between. If you move forward, the audit fee is credited toward the work.',
  },
  {
    n: '03',
    title: 'We grow with you.',
    body: 'We stay on as a partner, not a vendor. As trust builds we take on more, and the business keeps getting leaner — side by side, at the pace you set.',
  },
];

export default function Approach() {
  const ref = useRegistration<HTMLElement>();

  return (
    <section id="approach" ref={ref} className={styles.approach} aria-labelledby="approach-h">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">How it works</p>
          <h2 id="approach-h" className={`said ${styles.heading}`}>
            A journey we take together
          </h2>
          <p className={styles.sub}>
            We don't hand you a system and walk away. Three steps — and you set the pace
            throughout.
          </p>
        </header>

        <ol className={styles.steps}>
          {steps.map((s) => (
            <li key={s.n} className={styles.step}>
              <span className={`kept ${styles.num}`} aria-hidden="true">{s.n}</span>
              <div className="rule" aria-hidden="true" />
              <h3 className={`said ${styles.title}`}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
