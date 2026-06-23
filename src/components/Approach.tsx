import { useEnter } from '../hooks/useScrollMotion';
import styles from './Approach.module.css';

const steps = [
  {
    n: '01',
    title: 'We map where the time goes.',
    body: 'A deep audit across your tools and inboxes. You get a plain-English analysis — where your team\'s hours actually go, what\'s repetitive, what\'s automatable, and what it costs you over a year. Yours to keep, whether or not we ever work together.',
  },
  {
    n: '02',
    title: 'We turn the map into action.',
    body: 'Those same findings become the blueprint: we bring your tools into one record, then start taking the repetitive work off your plate — you approving every step. If you move forward, the audit fee is credited toward the work.',
  },
  {
    n: '03',
    title: 'We grow with you.',
    body: 'We stay on as a partner, not a vendor. As trust builds we take on more, and the business keeps getting leaner — side by side, at the pace you set.',
  },
];

export default function Approach() {
  const ref = useEnter<HTMLElement>();

  return (
    <section id="approach" ref={ref} className={styles.approach} aria-labelledby="approach-h">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">How it works</p>
          <h2 id="approach-h" className={`said ${styles.heading} rise`}>
            A journey we take together
          </h2>
          <p className={`${styles.sub} rise`}>
            We don't hand you a system and walk away. Three stops — and you set the pace
            throughout.
          </p>
        </header>

        <ol className={styles.route}>
          {steps.map((s) => (
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
