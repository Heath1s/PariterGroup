import { useEffect, useRef } from 'react';

/**
 * "The Day's Run" motion engine.
 *
 * One shared, rAF-batched scroll/resize loop drives every scroll-linked value
 * on the page. Two primitives read from it:
 *
 *   useEnter — sets a per-section `--enter` (0 arriving → 1 settled) on an
 *              element. CSS custom properties inherit, so a single write per
 *              section feeds every `.rise` / `.lift` child. Defaults to 1, so
 *              with JS disabled or reduced motion the page renders finished.
 *
 *   useDay   — sets a global `--day` (0 → 1) on <html> from page scroll, and
 *              calls back with it so the rail can render the working-day clock.
 *
 * Contract: we only ever write transform/opacity-driving custom properties.
 * No layout is read-then-written in a way that thrashes; we read rects once
 * per frame and write vars. No scroll is ever hijacked or retimed.
 */

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

type EnterEntry = { el: HTMLElement; start: number; end: number };
type DayEntry = { onDay: (day: number) => void };

const enterEntries = new Set<EnterEntry>();
const dayEntries = new Set<DayEntry>();
let rafId = 0;
let listening = false;

function frame() {
  rafId = 0;
  const vh = window.innerHeight || 1;

  for (const e of enterEntries) {
    const top = e.el.getBoundingClientRect().top;
    const p0 = e.start * vh;
    const p1 = e.end * vh;
    const span = p0 - p1 || 1;
    e.el.style.setProperty('--enter', clamp01((p0 - top) / span).toFixed(4));
  }

  if (dayEntries.size) {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const y = window.scrollY || window.pageYOffset || 0;
    const day = max > 0 ? clamp01(y / max) : 1;
    doc.style.setProperty('--day', day.toFixed(4));
    for (const d of dayEntries) d.onDay(day);
  }
}

function schedule() {
  if (!rafId) rafId = requestAnimationFrame(frame);
}

function ensureListening() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
}

function maybeStop() {
  if (enterEntries.size || dayEntries.size) return;
  listening = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

/**
 * Settle a section as it enters. `start`/`end` are the section top's position
 * as a fraction of viewport height where `--enter` reads 0 and 1 respectively.
 * Default: arrives at the bottom of the viewport (1) and is settled by the time
 * its top reaches 62% down.
 */
export function useEnter<T extends HTMLElement = HTMLElement>(
  opts: { start?: number; end?: number } = {},
) {
  const ref = useRef<T>(null);
  const { start = 1, end = 0.62 } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return; // leave --enter at its CSS default (1)

    const entry: EnterEntry = { el, start, end };
    enterEntries.add(entry);
    ensureListening();
    schedule(); // resolve initial state before the first settled paint

    return () => {
      entry.el.style.removeProperty('--enter');
      enterEntries.delete(entry);
      maybeStop();
    };
  }, [start, end]);

  return ref;
}

/** Drive the global working-day progress; `onDay` fires each frame with 0→1. */
export function useDay(onDay: (day: number) => void) {
  const cb = useRef(onDay);
  useEffect(() => { cb.current = onDay; });

  useEffect(() => {
    if (prefersReduced()) {
      // Hold the day still and finished; no continuous movement.
      document.documentElement.style.setProperty('--day', '0');
      cb.current(0);
      return;
    }
    const entry: DayEntry = { onDay: (d) => cb.current(d) };
    dayEntries.add(entry);
    ensureListening();
    schedule();
    return () => {
      dayEntries.delete(entry);
      maybeStop();
    };
  }, []);
}
