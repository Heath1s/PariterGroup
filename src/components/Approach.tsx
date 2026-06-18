import styles from './Approach.module.css';

const steps = [
  {
    num: '01',
    title: 'We find the waste.',
    body: 'A paid audit that goes deep into where your team\'s time actually goes. You\'ll get a clear, plain-English picture of what\'s being lost each week and what that costs you annually — nothing jargon-y, nothing vague.',
  },
  {
    num: '02',
    title: 'We eliminate it.',
    body: 'We connect your tools and automate the menial work, so the data stops needing a human relay and your people stop living in spreadsheets. If you move forward, your audit fee is credited toward this work.',
  },
  {
    num: '03',
    title: 'We grow with you.',
    body: 'We stay on as a partner — not a vendor. As trust builds, we take on more. The relationship deepens, the business keeps getting leaner, and the gains compound over time.',
  },
];

export default function Approach() {
  return (
    <section id="approach" className={styles.approach} aria-labelledby="approach-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="section-label">Our approach</span>
          <h2 id="approach-heading" className={styles.heading}>
            A journey we take together
          </h2>
          <p className={styles.sub}>
            We don't drop a system on you and walk away. We follow three steps —
            and you set the pace throughout.
          </p>
        </div>

        <ol className={styles.steps} aria-label="Our three-step approach">
          {steps.map((step) => (
            <li key={step.num} className={styles.step}>
              <span className={styles.stepNum} aria-hidden="true">{step.num}</span>
              <div className={styles.stepDivider} aria-hidden="true" />
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
