import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * Premium momentum scrolling (Lenis), driven by GSAP's ticker and kept in sync
 * with ScrollTrigger. Disabled entirely under prefers-reduced-motion and on
 * coarse pointers (touch), where native scrolling feels better and lighter.
 * Call once, high in the tree.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    // `noSmooth` is an escape hatch for tooling/screenshots (Lenis runs a
    // perpetual rAF that some capture tools wait on forever).
    const off = (() => { try { return localStorage.getItem('noSmooth'); } catch { return null; } })();
    if (reduce || coarse || off) return; // native scroll — lightest, best on phones

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    // expose for tooling/debugging (harmless in prod)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
    };
  }, []);
}
