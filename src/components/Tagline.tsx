import { useEffect, useRef } from 'react';
import tagline from '../content/tagline.json';
import { gsap, ScrollTrigger } from '../lib/gsap';
import styles from './Tagline.module.css';

type Word = { text: string; accent: boolean };

function toWords(text: string, accent: string): Word[] {
  const a = text.trim().split(/\s+/).map((t) => ({ text: t, accent: false }));
  const b = accent.trim().split(/\s+/).map((t) => ({ text: t, accent: true }));
  return [...a, ...b];
}

export default function Tagline() {
  const section = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLParagraphElement>(null);
  const words = toWords(tagline.text, tagline.accent);

  useEffect(() => {
    const sec = section.current;
    const wrapEl = wrap.current;
    if (!sec || !wrapEl) return;

    const spans = Array.from(
      wrapEl.querySelectorAll<HTMLElement>(`.${styles.word}`),
    );

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      spans.forEach((s) => s.style.setProperty('--t', '1'));
      return;
    }

    const n = spans.length;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top top',
        end: 'bottom bottom',
        pin: wrapEl,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          // each word fills a little after the one before it
          const reveal = self.progress * (n + 6);
          for (let i = 0; i < n; i++) {
            const t = Math.min(1, Math.max(0, reveal - i));
            spans[i].style.setProperty('--t', t.toFixed(3));
          }
        },
      });
    }, sec);

    return () => ctx.revert();
  }, [words.length]);

  return (
    <section id="thesis" ref={section} className={styles.section} aria-label="What we do, in one line">
      <div className={styles.pin}>
        <div className="container">
          <p className={`eyebrow ${styles.eyebrow}`}>{tagline.eyebrow}</p>
          <p ref={wrap} className={`said ${styles.line}`}>
            {words.map((w, i) => (
              <span
                key={i}
                className={`${styles.word} ${w.accent ? styles.accent : ''}`}
              >
                {w.text}{' '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
