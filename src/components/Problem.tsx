import styles from './Problem.module.css';

export default function Problem() {
  return (
    <section className={styles.problem} aria-labelledby="problem-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className="section-label">The problem</span>
          <h2 id="problem-heading" className={styles.heading}>
            The hours that slip away
          </h2>
        </div>
        <div className={styles.body}>
          <p>
            Most established businesses run on tools that were never meant to work together.
            Someone on your team copies order details from email into the job management system.
            Someone else re-enters those numbers into the books. An invoice gets printed, scanned,
            and keyed in by hand. A job gets scheduled over the phone and transcribed into a
            spreadsheet before it reaches the field crew.
          </p>
          <p>
            None of this is exceptional — it's the norm. And across a week, it adds up to
            hours of work your people are doing instead of the work they were actually hired for.
          </p>
          <p>
            That time belongs somewhere better.
          </p>
        </div>
      </div>
    </section>
  );
}
