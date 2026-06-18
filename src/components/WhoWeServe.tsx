import styles from './WhoWeServe.module.css';

export default function WhoWeServe() {
  return (
    <section className={styles.who} aria-labelledby="who-heading">
      <div className={`container ${styles.inner}`}>
        <span className="section-label">Who we work with</span>
        <div className={styles.content}>
          <h2 id="who-heading" className={styles.heading}>
            Established businesses running on hard work — and tools that weren't built to keep up.
          </h2>
          <div className={styles.body}>
            <p>
              We're built for companies with real revenue — typically in the $5M to $30M
              range — that are growing on the back of good work and a reliable team. Not
              software companies. The kind of business where the knowledge lives in people's
              heads and inboxes, and the systems are a patchwork that mostly works.
            </p>
            <p>
              Distribution businesses, trades companies, logistics operations: places where
              good people are losing hours every day to admin that could be handled by
              better-connected tools. If your team is spending more time managing data
              than doing the work they were hired for, we should talk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
