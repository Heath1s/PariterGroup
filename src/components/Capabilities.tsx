import { useRegistration } from '../hooks/useRegistration';
import styles from './Capabilities.module.css';

const items = [
  {
    tick: 'one record',
    title: 'One source of truth',
    body: 'Orders, invoices, and inventory live in one place. No one spends the morning moving numbers between screens.',
  },
  {
    tick: 'said → kept, same day',
    title: 'The relay, gone',
    body: 'What\'s said reaches what\'s kept on its own. Tuesday\'s order is in the books on Tuesday — not whenever someone gets to it.',
  },
  {
    tick: 'entered once',
    title: 'Fewer errors, less chasing',
    body: 'When a figure isn\'t retyped, it isn\'t mistyped. The detail that used to fall through the cracks simply arrives.',
  },
  {
    tick: 'one plan',
    title: 'Scheduling that lines up',
    body: 'Dispatch, the field crew, and the office all work from the same record — so the day runs on one plan, not three.',
  },
];

export default function Capabilities() {
  const ref = useRegistration<HTMLElement>();

  return (
    <section id="capabilities" ref={ref} className={styles.caps} aria-labelledby="caps-h">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">What we do</p>
          <h2 id="caps-h" className={`said ${styles.heading}`}>
            We bring your tools into one record
          </h2>
          <p className={styles.sub}>
            The work is plain: connect the systems you already run, and let what's said
            reach what's kept without a person carrying it across.
          </p>
        </header>

        <ul className={styles.grid}>
          {items.map((it) => (
            <li key={it.title} className={styles.card}>
              <span className={`kept ${styles.tick}`} aria-hidden="true">✓ {it.tick}</span>
              <div className="rule" aria-hidden="true" />
              <h3 className={`said ${styles.title}`}>{it.title}</h3>
              <p className={styles.body}>{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
