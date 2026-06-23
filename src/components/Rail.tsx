import { useRef, useState } from 'react';
import { useDay } from '../hooks/useScrollMotion';
import styles from './Rail.module.css';

/* The working day, in operator time: first light to the close. */
const START = 6 * 60 + 30; // 06:30
const END = 18 * 60;       // 18:00

function clockAt(day: number) {
  const m = Math.round(START + (END - START) * day);
  const hh = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

/**
 * The line that runs the page — the ledger rule, the route, the conveyor.
 * A fixed spine in the left gutter: a faint full line, a brighter "travelled"
 * fill scaled by --day, and a marker that carries the working-day clock down
 * the page at your scroll pace. The readout inverts over dark-grounded
 * sections so it stays legible the whole way down. Purely decorative; hidden
 * below 1280px and held still under reduced motion.
 */
export default function Rail() {
  const timeRef = useRef<HTMLSpanElement>(null);
  const lastTime = useRef('06:30');
  const lastDark = useRef(false);
  const [dark, setDark] = useState(false);

  useDay((day) => {
    const next = clockAt(day);
    if (next !== lastTime.current && timeRef.current) {
      timeRef.current.textContent = next;
      lastTime.current = next;
    }
    // sample the ground behind the marker so the clock stays readable
    const inset = 120; // matches --inset (7.5rem)
    const vh = window.innerHeight;
    const y = Math.min(vh - 1, Math.max(0, inset + day * (vh - inset * 2)));
    const el = document.elementFromPoint(26, y);
    const isDark = !!(el && el.closest('[data-ground="dark"]'));
    if (isDark !== lastDark.current) {
      lastDark.current = isDark;
      setDark(isDark);
    }
  });

  return (
    <aside className={`${styles.rail} ${dark ? styles.dark : ''}`} aria-hidden="true">
      <span className={`${styles.cap} ${styles.capTop}`} />
      <span className={styles.line} />
      <span className={styles.fill} />
      <span className={`${styles.cap} ${styles.capBottom}`} />

      <span className={styles.phase} style={{ top: '50%' }} />

      <div className={styles.travel}>
        <span className={styles.bead} />
        <span className={styles.read}>
          <span ref={timeRef} className={styles.time}>06:30</span>
          <span className={styles.day}>the day</span>
        </span>
      </div>
    </aside>
  );
}
