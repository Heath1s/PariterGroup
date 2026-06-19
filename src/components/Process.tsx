import { useInView } from '../hooks/useInView';
import styles from './Process.module.css';

const steps = [
  {
    num: '01',
    title: 'We find the waste.',
    body: 'A paid audit goes deep into where your team\'s time goes. You get a clear, plain-English picture of what\'s being lost and what it costs annually.',
    delay: '100ms',
  },
  {
    num: '02',
    title: 'We eliminate it.',
    body: 'We connect your tools and automate the manual relay. If you move forward, the audit fee is credited toward this work.',
    delay: '200ms',
  },
  {
    num: '03',
    title: 'We grow with you.',
    body: 'We stay on as a partner — not a vendor. As trust builds we take on more, and the business keeps getting leaner.',
    delay: '300ms',
  },
];

function StepCard({ num, title, body, delay, inView }: {
  num: string;
  title: string;
  body: string;
  delay: string;
  inView: boolean;
}) {
  return (
    <div
      className={`${styles.card} reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: delay }}
    >
      <p className={styles.stepNum}>{num}</p>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepBody}>{body}</p>
    </div>
  );
}

export default function Process() {
  const { ref, inView } = useInView(0.08);

  return (
    <section id="approach" className={styles.process} aria-labelledby="process-heading">
      <div className="container">
        <div className={styles.header}>
          <p className={`section-eyebrow ${styles.eyebrow}`}>How it works</p>
          <h2 id="process-heading" className={styles.heading}>A journey we take together</h2>
          <p className={styles.subhead}>We don't drop a system on you and walk away. Three steps — you set the pace.</p>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={styles.grid}
        >
          {steps.map(step => (
            <StepCard
              key={step.num}
              num={step.num}
              title={step.title}
              body={step.body}
              delay={step.delay}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
