import { useEnter } from '../hooks/useScrollMotion';
import styles from './Testimonials.module.css';

// Illustrative scenarios — labeled as such on the page. These describe the workflows
// we run with pilot partners; real, attributed quotes replace them as pilots produce them.
const quotes = [
  {
    body: 'It understood our business — our grades, our customers, how a deal moves — better than any software we\'ve run. It drafts our order confirmations and flags what doesn\'t match; I approve every one, and it\'s never sent a thing on its own. My re-keying went from three hours a day to twenty minutes — and in the first month it caught $11k in shipments we\'d never invoiced.',
    who: 'Order desk',
    where: 'Steel & commodity brokerage',
    result: '3 hrs/day → 20 min · $11k recovered, month one',
  },
  {
    body: 'Importing is forty emails a container. Pariter learned our shipment lifecycle and drafts the status updates — flagging an ETA slip before it turns into a demurrage charge. I approve everything. It\'s already caught two slips that would\'ve been late-delivery penalties.',
    who: 'Logistics desk',
    where: 'Tree-nut importer',
    result: 'Two ETA slips caught before penalty',
  },
];

export default function Testimonials() {
  const ref = useEnter<HTMLElement>();

  return (
    <section id="proof" ref={ref} className={styles.proof} aria-labelledby="proof-h">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">What success looks like</p>
          <h2 id="proof-h" className={`said ${styles.heading} rise`}>
            The day, given back.
          </h2>
          <p className={`${styles.note} rise`}>
            Illustrative scenarios, drawn from the workflows we run with pilot partners. We name
            the work, not the businesses — our partners' data and their identity stay theirs.
          </p>
        </header>

        <ul className={styles.grid}>
          {quotes.map((q) => (
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
