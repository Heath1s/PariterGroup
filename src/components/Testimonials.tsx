import { useRegistration } from '../hooks/useRegistration';
import styles from './Testimonials.module.css';

// Illustrative scenarios — labeled as such on the page. These describe the workflows
// we run with pilot partners; real, attributed quotes replace them as pilots produce them.
const quotes = [
  {
    body: 'It understood our business — our grades, our customers, how a deal moves — better than any software we\'ve run. It drafts our order confirmations and flags what doesn\'t match; I approve every one, and it\'s never sent a thing on its own. My re-keying went from three hours a day to twenty minutes — and in the first month it caught $11k in shipments we\'d never invoiced.',
    who: 'Order desk',
    where: 'Steel & commodity brokerage',
  },
  {
    body: 'Importing is forty emails a container. Pariter learned our shipment lifecycle and drafts the status updates — flagging an ETA slip before it turns into a demurrage charge. I approve everything. It\'s already caught two slips that would\'ve been late-delivery penalties.',
    who: 'Logistics desk',
    where: 'Tree-nut importer',
  },
];

export default function Testimonials() {
  const ref = useRegistration<HTMLElement>();

  return (
    <section id="proof" ref={ref} className={styles.proof} aria-labelledby="proof-h">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">What success looks like</p>
          <h2 id="proof-h" className={`said ${styles.heading}`}>
            The day, given back.
          </h2>
          <p className={styles.note}>
            Illustrative scenarios, drawn from the workflows we run with pilot partners. We name
            the work, not the businesses — our partners' data and their identity stay theirs.
          </p>
        </header>

        <ul className={styles.grid}>
          {quotes.map((q) => (
            <li key={q.where} className={styles.card}>
              <blockquote className={`said ${styles.quote}`}>{q.body}</blockquote>
              <div className="rule" aria-hidden="true" />
              <p className={`kept ${styles.attr}`}>{q.who} · {q.where}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
