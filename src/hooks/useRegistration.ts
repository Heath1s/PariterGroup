import { useEffect, useRef } from 'react';

/**
 * "Into True" registration controller.
 *
 * A single shared, rAF-batched scroll/resize listener drives a `--reg`
 * custom property (0 → 1) on every registered element. CSS reads `--reg`
 * to close the offset between the "said" and "kept" registers.
 *
 * Static-first contract:
 *   - CSS defaults `--reg: 1` (in true). If this controller never runs
 *     (JS disabled, or prefers-reduced-motion), the page renders resolved.
 *   - We only ever drive `--reg` toward 1; we never reflow layout. CSS
 *     uses transform/opacity only, so there is no layout shift.
 *
 * progress is measured from an element's rect.top, expressed in fractions
 * of viewport height:
 *   start  — rect.top (× vh) at which progress = 0  (most misregistered)
 *   end    — rect.top (× vh) at which progress = 1  (fully in true)
 *
 * Defaults (start: 1, end: 0.55) resolve a section as it rises from the
 * bottom of the viewport to just above the reading band. The hero passes
 * { start: 0, end: -0.7 } so it begins misregistered at load and settles
 * as you scroll down through it.
 */

type RegOptions = { start?: number; end?: number };

type Entry = { el: HTMLElement; start: number; end: number };

const entries = new Set<Entry>();
let rafId = 0;
let listening = false;

function clamp01(n: number) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

function measure() {
  rafId = 0;
  const vh = window.innerHeight || 1;
  for (const entry of entries) {
    const top = entry.el.getBoundingClientRect().top;
    const p0 = entry.start * vh;
    const p1 = entry.end * vh;
    const span = p0 - p1 || 1;
    const progress = clamp01((p0 - top) / span);
    entry.el.style.setProperty('--reg', progress.toFixed(4));
  }
}

function schedule() {
  if (!rafId) rafId = requestAnimationFrame(measure);
}

function ensureListening() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
}

function stopListening() {
  if (entries.size > 0) return;
  listening = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

export function useRegistration<T extends HTMLElement = HTMLElement>(
  options: RegOptions = {},
) {
  const ref = useRef<T>(null);
  const { start = 1, end = 0.55 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect the user's motion preference: leave --reg at its CSS default (1).
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const entry: Entry = { el, start, end };
    entries.add(entry);
    ensureListening();
    schedule(); // compute initial state before first paint settles

    return () => {
      entries.delete(entry);
      el.style.removeProperty('--reg');
      stopListening();
    };
  }, [start, end]);

  return ref;
}
