import styles from './Capabilities.module.css';

const items = [
  {
    title: 'One source of record',
    body: 'We connect your older, disconnected platforms so information flows between them automatically. Orders, inventory, invoices — all in one place, without anyone having to move it.',
  },
  {
    title: 'Data that moves itself',
    body: 'The manual relay between email, your job system, and your books stops. What used to take someone an hour happens in the background, accurately, every time.',
  },
  {
    title: 'Scheduling and coordination',
    body: 'We bring the phone-and-whiteboard scheduling process into a single system — so dispatch, field crews, and the office are looking at the same information.',
  },
  {
    title: 'A partner, not a project',
    body: 'We stay on after the initial build. As your business changes, we adapt what we\'ve built — and take on more as the relationship grows.',
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className={styles.capabilities} aria-labelledby="cap-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="section-label">What we do</span>
          <h2 id="cap-heading" className={styles.heading}>
            Making your tools work the way your business does
          </h2>
          <p className={styles.sub}>
            We connect your systems, automate the data entry, and free your people
            from the manual work that shouldn't be theirs to carry.
          </p>
        </div>

        <ul className={styles.grid} aria-label="Capabilities">
          {items.map((item) => (
            <li key={item.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
