import { useEnter } from '../hooks/useScrollMotion';
import styles from './Trust.module.css';

// Grounded in the real IT security posture (read-only Microsoft admin-consent integration).
const points = [
  {
    k: 'read-only',
    t: 'We can read, not touch',
    b: 'We connect read-only. We can\'t send, edit, move, or delete anything in your systems — there is no write access of any kind.',
  },
  {
    k: 'no credentials',
    t: 'Your passwords never reach us',
    b: 'We authenticate as our own registered app, never as your users. We never receive or store your passwords or sign-in tokens — there is nothing of yours to leak.',
  },
  {
    k: 'one click off',
    t: 'Revoke instantly, anytime',
    b: 'You grant access through Microsoft\'s own consent screen, and remove it in one click. Access stops the moment you do.',
  },
  {
    k: 'scoped',
    t: 'Only what\'s needed',
    b: 'We can limit access to specific mailboxes — just the deals desk, say — instead of your whole organization. You set the scope.',
  },
  {
    k: 'encrypted',
    t: 'Encrypted, certified hosting',
    b: 'Your data lives in SOC 2 Type II–certified infrastructure, encrypted in transit and at rest. Secrets are stored separately, never in our code.',
  },
  {
    k: 'never sold',
    t: 'Yours, and only yours',
    b: 'Your data is never sold, never shared with third parties, and never used to train any public AI model. Isolated per business, and deleted on request.',
  },
];

export default function Trust() {
  const ref = useEnter<HTMLElement>();

  return (
    <section id="security" ref={ref} data-ground="dark" className={styles.trust} aria-labelledby="trust-h">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">Security</p>
          <h2 id="trust-h" className={`said ${styles.heading} rise`}>
            We treat your business like it's ours to protect.
          </h2>
          <p className={styles.sub}>
            We're asking established businesses to let us see how they really run. We don't take
            that lightly. Access is read-only, kept to the minimum, and yours to revoke at any
            moment — so the trust only ever runs one way.
          </p>
        </header>

        <ul className={styles.grid}>
          {points.map((p) => (
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
