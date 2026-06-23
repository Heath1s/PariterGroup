import { useEnter } from '../hooks/useScrollMotion';
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
  const ref = useEnter<HTMLElement>();

  return (
    <section id="capabilities" ref={ref} className={styles.caps} aria-labelledby="caps-h">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">What we do</p>
          <h2 id="caps-h" className={`said ${styles.heading} rise`}>
            We bring your business into one record — then put it to work
          </h2>
          <p className={`${styles.sub} rise`}>
            First, everything your business knows — orders, emails, invoices, inventory —
            comes into one place. Then we learn how it actually runs. Then the repetitive work
            starts handling itself, with you approving every step.
          </p>
        </header>

        <ul className={styles.grid}>
          {items.map((it) => (
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
          <p className="eyebrow">Where this goes</p>
          <h3 className={`said ${styles.visionHeading}`}>
            A business that understands itself.
          </h3>
          <p className={styles.visionBody}>
            Email and your system of record are only the start. Over time you connect the
            rest — every tool your business runs on — and we bring them into one understanding
            of how your business actually works, end to end. The more scattered your systems
            are today, the more there is to gain. On that understanding, AI agents take on the
            repetitive work — drafting the follow-up, updating the order, chasing the line that
            didn't cross. They begin by watching and suggesting; you approve every action; they
            earn more only as they prove themselves.
          </p>
          <p className={`said ${styles.visionPull}`}>
            Not software you operate. A coworker that learns your business.
          </p>
        </div>

        {/* What we're not — the three alternatives a buyer weighs us against. */}
        <div className={styles.diff}>
          <p className="eyebrow">Why pariter, not the alternatives</p>
          <ul className={styles.diffGrid}>
            <li>
              <span className={`kept ${styles.diffTick}`} aria-hidden="true">not another hire</span>
              <p className={styles.diffBody}>
                Another hire adds a person to the gap. We close it — the work stops being
                handwork, instead of getting faster hands.
              </p>
            </li>
            <li>
              <span className={`kept ${styles.diffTick}`} aria-hidden="true">not generic AI</span>
              <p className={styles.diffBody}>
                ChatGPT and Copilot start from zero every conversation. pariter learns your
                business once — your customers, your products, your way of working — and
                remembers.
              </p>
            </li>
            <li>
              <span className={`kept ${styles.diffTick}`} aria-hidden="true">not a new system</span>
              <p className={styles.diffBody}>
                No rip-and-replace, no year-long rollout. We sit on top of the tools you
                already run. Nothing to migrate; you keep what works.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
