import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-heading">
      <div className={`container ${styles.inner}`}>
        <span className="section-label">About</span>
        <div className={styles.content}>
          <h2 id="about-heading" className={styles.heading}>
            Side by side. As equals. At your pace.
          </h2>
          <div className={styles.body}>
            <p>
              Pariter is Latin for <em>side by side</em> — as equals, at the same pace. It
              shares a root with <em>par</em> and <em>pair</em>, so even without the Latin,
              most people already sense what it means: equal footing, moving together.
            </p>
            <p>
              That's not a tagline. It's how the firm actually works. We don't sit above you
              as a vendor who hands over a system and moves on. We come alongside you — at
              your pace, in your business — and we stay on as the work compounds.
            </p>
            <p>
              We grow when you grow. The relationship is the product.
            </p>
          </div>
        </div>

        <div className={styles.divider} aria-hidden="true">
          <div className={styles.dividerLine} />
          <div className={styles.dividerLine} />
        </div>
      </div>
    </section>
  );
}
