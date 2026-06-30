import { useEffect, useRef } from 'react';
import hero from '../content/hero.json';
import { gsap } from '../lib/gsap';
import styles from './Hero.module.css';

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  // The sun rises out of the sea as you scroll the hero. Sky and water drift
  // gently behind the copy. Skipped under reduced motion.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Re-establish centring as GSAP transforms so we can animate y/scale
      // cleanly (CSS keeps translate(-50%,-50%) for the no-JS / reduced case).
      gsap.set(`.${styles.sun}`, { xPercent: -50, yPercent: -50, x: 0, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
      // The sun climbs most of the viewport and swells as it clears the sea.
      tl.to(`.${styles.sun}`,   { y: () => -window.innerHeight * 0.66, scale: 1.22, ease: 'none' }, 0)
        .to(`.${styles.ocean}`, { yPercent: 7, ease: 'none' }, 0)
        .to(`.${styles.sky}`,   { yPercent: 9, ease: 'none' }, 0)
        .to(`.${styles.copy}`,  { yPercent: -24, opacity: 0, ease: 'none' }, 0);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className={styles.hero} aria-labelledby="hero-h">
      <div className={styles.sky} aria-hidden="true" />
      <span className={styles.sun} aria-hidden="true" />

      {/* The sea — the sun emerges from behind it and lays a reflection down its face. */}
      <div className={styles.ocean} aria-hidden="true">
        <span className={styles.reflection} />
        <span className={`${styles.wave} ${styles.wave1}`} />
        <span className={`${styles.wave} ${styles.wave2}`} />
        <span className={`${styles.wave} ${styles.wave3}`} />
      </div>

      <div className={styles.scrim} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.eyebrow}`}>{hero.eyebrow}</p>
          <h1 id="hero-h" className={`said ${styles.headline}`}>{hero.headline}</h1>
          <p className={styles.sub}>{hero.sub}</p>
          <div className={styles.actions}>
            <a href="#contact" className="btn">
              {hero.ctaPrimary} <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href="#story" className={styles.quiet}>
              {hero.ctaSecondary} <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>

      <a href="#thesis" className={styles.cue} aria-label="Scroll to read more">
        <span className={styles.cueLine} />
      </a>
    </section>
  );
}
