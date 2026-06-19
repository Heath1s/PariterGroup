import { useInView } from '../hooks/useInView';
import styles from './Positioning.module.css';

export default function Positioning() {
  const { ref, inView } = useInView(0.15);

  return (
    <section className={styles.positioning}>
      <div className="container">
        <p
          ref={ref as React.RefObject<HTMLParagraphElement>}
          className={`${styles.quote} reveal ${inView ? 'in-view' : ''}`}
        >
          <em>Side by side, as equals, at your pace — that's not a tagline. It's how we work.</em>
        </p>
      </div>
    </section>
  );
}
