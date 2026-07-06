import { useEffect, useRef, useState, type ReactNode } from 'react';
import workday from '../content/workday.json';
import { gsap, ScrollTrigger } from '../lib/gsap';
import styles from './Workday.module.css';

/* ────────────────────────────────────────────────────────────────────────────
   "One ordinary Tuesday" — the day, staged.

   A pinned, scrubbed theatre piece: messages arrive on the left in the human
   voice, Pariter reads them (key phrases underlined and tagged), the reference
   docket flies across the stage, and the entry prints itself into a paper Day
   Book that accumulates through the day — each line stamped as it lands.
   Above it all a sun crosses from dawn to dusk; below, a working-day rail
   tracks the clock. The finale rules the book off, prints the totals, and
   drops the RECONCILED stamp.

   Three renders:
   · scrub    — desktop, fine pointer, motion allowed (the full piece)
   · timeline — narrow viewports: a vertical day with CSS-transition reveals
   · static   — reduced motion: the timeline layout, finished, held still
   ──────────────────────────────────────────────────────────────────────────── */

const DAY_START = 6 * 60 + 30; // 06:30
const DAY_END = 18 * 60; //       18:00
const DAY_SPAN = DAY_END - DAY_START;

const STEP_U = 10; //   scrub units per ordinary step
const INTRO_U = 1.6; // pre-dawn dwell before the first message
const FINALE_U = 7.2; // close-of-day sequence after the last message arrives
const VH_PER_U = 16; // scroll length given to one unit

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function fmtTime(mins: number) {
  const h = Math.floor(mins / 60);
  const m = Math.floor(mins % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
function parseHM(hm: string) {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + m;
}
function fmtMetric(value: number, to: number, suffix?: string) {
  const v = Number.isInteger(to) ? String(Math.round(value)) : value.toFixed(1);
  return `${v}${suffix ?? ''}`;
}
/** Piecewise-linear read of [progress, value] anchor pairs (sorted by progress). */
function anchored(anchors: [number, number][], p: number) {
  if (p <= anchors[0][0]) return anchors[0][1];
  for (let i = 1; i < anchors.length; i++) {
    if (p <= anchors[i][0]) {
      const [p0, v0] = anchors[i - 1];
      const [p1, v1] = anchors[i];
      return lerp(v0, v1, p1 === p0 ? 1 : (p - p0) / (p1 - p0));
    }
  }
  return anchors[anchors.length - 1][1];
}
/** Layout position of `el`'s centre inside `stop` (transform-independent). */
function centreIn(el: HTMLElement, stop: HTMLElement) {
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = el;
  while (n && n !== stop) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
}

type Mark = { text: string; label: string };
type Mode = 'scrub' | 'timeline' | 'static';

/** Split `said` around its marked phrases so each mark can be underlined,
    tagged, and used as the docket's point of departure. */
function renderSaid(said: string, marks: Mark[]) {
  const out: ReactNode[] = [];
  let rest = said;
  let key = 0;
  marks.forEach((m) => {
    const at = rest.indexOf(m.text);
    if (at === -1) return;
    if (at > 0) out.push(<span key={key++}>{rest.slice(0, at)}</span>);
    out.push(
      <span key={key++} className={styles.mark}>
        {m.text}
        <span className={styles.markInk} aria-hidden="true" />
        <span className={styles.markTag} aria-hidden="true">
          {m.label}
        </span>
      </span>,
    );
    rest = rest.slice(at + m.text.length);
  });
  out.push(<span key={key++}>{rest}</span>);
  return out;
}

export default function Workday() {
  const { eyebrow, heading, sub, dayLabel, ledgerTitle, saidLabel, keptLabel, quiet, steps, close, metrics } =
    workday;
  const stepMins = steps.map((s) => parseHM(s.time));
  const rowSteps = steps.slice(0, -1); // ordinary entries; the last step closes the book

  const section = useRef<HTMLElement>(null);

  const [mode] = useState<Mode>(() => {
    if (typeof window === 'undefined') return 'static';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'static';
    if (window.matchMedia('(max-width: 900px)').matches) return 'timeline';
    return 'scrub';
  });

  /* ── refs: the scrub stage ── */
  const stage = useRef<HTMLDivElement>(null);
  const sky = useRef<HTMLDivElement>(null);
  const sun = useRef<HTMLSpanElement>(null);
  const skyDawn = useRef<HTMLSpanElement>(null);
  const skyNoon = useRef<HTMLSpanElement>(null);
  const skyDusk = useRef<HTMLSpanElement>(null);
  const quietEl = useRef<HTMLParagraphElement>(null);
  const msgs = useRef<(HTMLElement | null)[]>([]);
  const chipXs = useRef<(HTMLDivElement | null)[]>([]);
  const chipYs = useRef<(HTMLDivElement | null)[]>([]);
  const chips = useRef<(HTMLSpanElement | null)[]>([]);
  const sheet = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const rowInners = useRef<(HTMLDivElement | null)[]>([]);
  const rowRefCells = useRef<(HTMLSpanElement | null)[]>([]);
  const stamps = useRef<(HTMLSpanElement | null)[]>([]);
  const stampRings = useRef<(HTMLSpanElement | null)[]>([]);
  const totalRule = useRef<HTMLDivElement>(null);
  const totalInner = useRef<HTMLDivElement>(null);
  const grandStamp = useRef<HTMLSpanElement>(null);
  const grandRing = useRef<HTMLSpanElement>(null);
  const captions = useRef<(HTMLParagraphElement | null)[]>([]);
  const clock = useRef<HTMLSpanElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const needle = useRef<HTMLSpanElement>(null);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);
  const metricEls = useRef<(HTMLSpanElement | null)[]>([]);
  /* ── refs: the mobile timeline ── */
  const tlItems = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (mode === 'static') return;

    if (mode === 'timeline') {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add(styles.tlIn);
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.25, rootMargin: '0px 0px -8% 0px' },
      );
      tlItems.current.forEach((el) => el && io.observe(el));
      return () => io.disconnect();
    }

    /* ── mode === 'scrub': build the day ── */
    const sec = section.current;
    const stageEl = stage.current;
    if (!sec || !stageEl) return;

    const ctx = gsap.context(() => {
      gsap.set(sun.current, { xPercent: -50, yPercent: -50 });

      // immediateRender:false — with scrub + invalidateOnRefresh, fromTo
      // "from" states must not paint until the playhead actually reaches them.
      const tl = gsap.timeline({
        defaults: { ease: 'none', immediateRender: false },
        paused: true,
      });
      /** [timeline-seconds, minutes-of-day] — moments the clock must hit. */
      const timeAnchor: [number, number][] = [[0, DAY_START]];
      /** [timeline-seconds, entries-cleared] — the counter ticks as stamps land. */
      const clearedAt: [number, number][] = [[0, 0], [INTRO_U + 0.9, 0]];
      const clearedPerStep = [12, 26, 38];

      // The marks live inside each message card; found once, animated by index.
      const inkSel = `.${styles.markInk}`;
      const tagSel = `.${styles.markTag}`;
      const markSel = `.${styles.mark}`;
      const inksOf = (i: number) =>
        Array.from(msgs.current[i]?.querySelectorAll<HTMLElement>(inkSel) ?? []);
      const tagsOf = (i: number) =>
        Array.from(msgs.current[i]?.querySelectorAll<HTMLElement>(tagSel) ?? []);

      const from = (i: number) => {
        const mark = msgs.current[i]?.querySelector<HTMLElement>(markSel);
        return mark ? centreIn(mark, stageEl) : { x: 0, y: 0 };
      };
      const to = (i: number) => {
        const cell = rowRefCells.current[i];
        return cell ? centreIn(cell, stageEl) : { x: 0, y: 0 };
      };

      steps.forEach((_s, i) => {
        const isClose = i === steps.length - 1;
        const base = INTRO_U + i * STEP_U;
        const msg = msgs.current[i];
        if (!msg) return;

        // The message arrives and settles.
        tl.fromTo(
          msg,
          { y: 44, opacity: 0, scale: 0.982 },
          { y: 0, opacity: 1, scale: 1, duration: 1.15, ease: 'power3.out' },
          base,
        );
        if (i === 0 && quietEl.current) {
          tl.to(quietEl.current, { opacity: 0, y: -14, duration: 0.5, ease: 'power1.in' }, base);
        }

        const stepInks = inksOf(i);
        const stepTags = tagsOf(i);

        if (!isClose) {
          // Pariter reads it: underline draws, tag settles above the phrase.
          stepInks.forEach((ink, j) => {
            tl.fromTo(
              ink,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.55, ease: 'power2.inOut' },
              base + 1.05 + j * 0.35,
            );
          });
          stepTags.forEach((tag, j) => {
            tl.fromTo(
              tag,
              { opacity: 0, y: 7 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
              base + 1.25 + j * 0.35,
            );
          });

          // The docket lifts out of the sentence and arcs across the stage…
          const chipX = chipXs.current[i];
          const chipY = chipYs.current[i];
          const chip = chips.current[i];
          const fly = base + 2.45;
          if (chipX && chipY && chip) {
            tl.fromTo(
              chipX,
              { x: () => from(i).x },
              { x: () => to(i).x, duration: 1.5, ease: 'power1.inOut' },
              fly,
            );
            tl.fromTo(
              chipY,
              { y: () => from(i).y - 12 },
              { y: () => from(i).y - 54, duration: 0.72, ease: 'power2.out' },
              fly,
            );
            tl.to(chipY, { y: () => to(i).y, duration: 0.78, ease: 'power2.in' }, fly + 0.72);
            tl.fromTo(
              chip,
              { opacity: 0, scale: 0.5, rotation: -3 },
              { opacity: 1, scale: 1, rotation: 2, duration: 0.35, ease: 'back.out(1.7)' },
              fly - 0.3,
            );
            tl.to(chip, { opacity: 0, scale: 0.55, duration: 0.28, ease: 'power2.in' }, fly + 1.26);
          }

          // …and prints itself onto the next ruled line.
          const rowInner = rowInners.current[i];
          const row = rows.current[i];
          if (rowInner && row) {
            tl.fromTo(
              rowInner,
              { clipPath: 'inset(0% 100% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.95, ease: 'power1.inOut' },
              base + 3.75,
            );
            tl.fromTo(row, { '--glow': 0 }, { '--glow': 1, duration: 0.35, ease: 'power1.out' }, base + 3.75);
            tl.to(row, { '--glow': 0, duration: 0.9, ease: 'power1.inOut' }, base + 4.85);
          }

          // The stamp lands — the sheet takes the thunk.
          const stamp = stamps.current[i];
          const ring = stampRings.current[i];
          const stampAt = base + 4.95;
          if (stamp) {
            tl.fromTo(
              stamp,
              { opacity: 0, scale: 1.8, rotation: -12 },
              { opacity: 1, scale: 1, rotation: -4, duration: 0.42, ease: 'power4.in' },
              stampAt,
            );
          }
          if (ring) {
            tl.fromTo(
              ring,
              { opacity: 0.5, scale: 0.55 },
              { opacity: 0, scale: 1.7, duration: 0.55, ease: 'power2.out' },
              stampAt + 0.38,
            );
          }
          if (sheet.current) {
            tl.to(sheet.current, { y: 2.5, duration: 0.09, ease: 'power1.in' }, stampAt + 0.36)
              .to(sheet.current, { y: 0, duration: 0.4, ease: 'power3.out' }, stampAt + 0.45);
          }
          timeAnchor.push([stampAt + 0.4, stepMins[i]]);
          clearedAt.push([stampAt + 0.4, clearedPerStep[i] ?? 0]);

          // Caption hands over; the message withdraws before the next arrives.
          if (i > 0) {
            const prev = captions.current[i - 1];
            if (prev) tl.to(prev, { opacity: 0, y: -8, duration: 0.4, ease: 'power1.in' }, base + 5.25);
          }
          const cap = captions.current[i];
          if (cap) {
            tl.fromTo(
              cap,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
              base + 5.6,
            );
          }
          tl.to(msg, { y: -34, opacity: 0, duration: 0.85, ease: 'power2.inOut' }, base + STEP_U - 1.4);
          stepInks.forEach((ink) =>
            tl.to(ink, { scaleX: 0, duration: 0.3, ease: 'power1.in' }, base + STEP_U - 1.5),
          );
          stepTags.forEach((tag) =>
            tl.to(tag, { opacity: 0, duration: 0.3, ease: 'power1.in' }, base + STEP_U - 1.5),
          );
        } else {
          /* ── The close of day ── */
          const prevCap = captions.current[i - 1];
          if (prevCap) tl.to(prevCap, { opacity: 0, y: -8, duration: 0.4, ease: 'power1.in' }, base + 1.1);

          if (totalRule.current) {
            tl.fromTo(
              totalRule.current,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
              base + 1.25,
            );
          }
          if (totalInner.current) {
            tl.fromTo(
              totalInner.current,
              { clipPath: 'inset(0% 100% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'power1.inOut' },
              base + 1.95,
            );
          }
          const stampAt = base + 2.85;
          if (grandStamp.current) {
            tl.fromTo(
              grandStamp.current,
              { opacity: 0, scale: 2.05, rotation: -16 },
              { opacity: 1, scale: 1, rotation: -8, duration: 0.55, ease: 'power4.in' },
              stampAt,
            );
          }
          if (grandRing.current) {
            tl.fromTo(
              grandRing.current,
              { opacity: 0.45, scale: 0.6 },
              { opacity: 0, scale: 1.55, duration: 0.6, ease: 'power2.out' },
              stampAt + 0.5,
            );
          }
          if (sheet.current) {
            tl.to(sheet.current, { y: 3.5, duration: 0.1, ease: 'power1.in' }, stampAt + 0.48)
              .to(sheet.current, { y: 0, duration: 0.5, ease: 'power3.out' }, stampAt + 0.58);
          }
          timeAnchor.push([stampAt + 0.5, stepMins[i]]);
          clearedAt.push([base + 1.95, metrics[0]?.to ?? 47]);

          const cap = captions.current[i];
          if (cap) {
            tl.fromTo(
              cap,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
              stampAt + 0.75,
            );
          }
          // Dusk dwell — the finished book holds the stage.
          tl.to({}, { duration: FINALE_U - 3.6 }, stampAt + 0.75);
        }
      });

      const D = tl.duration();
      timeAnchor.push([D, DAY_END]);
      clearedAt.push([D, metrics[0]?.to ?? 47]);
      const timeAnchorP: [number, number][] = timeAnchor.map(([t, m]) => [t / D, m]);
      const clearedP: [number, number][] = clearedAt.map(([t, v]) => [t / D, v]);
      const dotFracs = stepMins.map((m) => (m - DAY_START) / DAY_SPAN);

      /* Geometry caches + fast setters for the per-frame layer. */
      let skyW = 0;
      let skyH = 0;
      let trackW = 0;
      const measure = () => {
        skyW = sky.current?.offsetWidth ?? 0;
        skyH = sky.current?.offsetHeight ?? 0;
        trackW = track.current?.offsetWidth ?? 0;
      };
      measure();
      ScrollTrigger.addEventListener('refreshInit', measure);

      const sunEl = sun.current;
      const needleEl = needle.current;
      const dawnEl = skyDawn.current;
      const noonEl = skyNoon.current;
      const duskEl = skyDusk.current;
      if (!sunEl || !needleEl || !dawnEl || !noonEl || !duskEl) return;
      const setSunX = gsap.quickSetter(sunEl, 'x', 'px');
      const setSunY = gsap.quickSetter(sunEl, 'y', 'px');
      const setNeedle = gsap.quickSetter(needleEl, 'x', 'px');
      const setDawn = gsap.quickSetter(dawnEl, 'opacity');
      const setNoon = gsap.quickSetter(noonEl, 'opacity');
      const setDusk = gsap.quickSetter(duskEl, 'opacity');

      const update = (p: number) => {
        const mins = anchored(timeAnchorP, p);
        const t = clamp01((mins - DAY_START) / DAY_SPAN);
        if (clock.current) clock.current.textContent = fmtTime(mins);

        // The sun crosses on a shallow arc; light warms, clears, then embers.
        setSunX((0.045 + 0.91 * t) * skyW);
        setSunY((0.9 - Math.sin(Math.PI * t) * 0.62) * skyH);
        setDawn(clamp01(1 - t / 0.3));
        setNoon(clamp01(Math.sin(Math.PI * clamp01((t - 0.16) / 0.68))));
        setDusk(clamp01((t - 0.64) / 0.26));

        setNeedle(t * trackW);
        dots.current.forEach((dot, i) => {
          if (dot) dot.style.opacity = t >= dotFracs[i] - 0.004 ? '1' : '0.3';
        });

        metricEls.current.forEach((el, i) => {
          if (!el) return;
          const m = metrics[i];
          const v =
            i === 0 ? anchored(clearedP, p) : i === 1 ? 0 : m.to * Math.pow(t, 1.3);
          el.textContent = fmtMetric(v, m.to, m.suffix);
        });
      };

      ScrollTrigger.create({
        trigger: sec,
        start: 'top top',
        end: 'bottom bottom',
        pin: `.${styles.pin}`,
        pinSpacing: false,
        scrub: 0.6,
        invalidateOnRefresh: true,
        animation: tl,
        onUpdate: (self) => update(self.progress),
        onRefresh: (self) => update(self.progress),
      });
      update(0);

      return () => ScrollTrigger.removeEventListener('refreshInit', measure);
    }, sec);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  /* ── Shared bits ─────────────────────────────────────────────────────────── */

  const channelChip = (channel: string) => (
    <span className={styles.channel}>{channel}</span>
  );

  /* ── Mobile / reduced: the day as a vertical ledger walk ─────────────────── */
  if (mode !== 'scrub') {
    return (
      <section id="story" ref={section} className={styles.section} aria-labelledby="story-h">
        <div className={`container ${styles.tlInner}`}>
          <header className={styles.head}>
            <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
            <h2 id="story-h" className={`said ${styles.heading}`}>{heading}</h2>
            <p className={styles.sub}>{sub}</p>
          </header>

          <ol className={`${styles.tl} ${mode === 'timeline' ? styles.tlAnimated : ''}`}>
            {steps.map((s, i) => {
              const isClose = i === steps.length - 1;
              return (
                <li
                  key={i}
                  ref={(el) => { tlItems.current[i] = el; }}
                  className={styles.tlItem}
                >
                  <span className={`kept ${styles.tlTime}`}>{s.time}</span>
                  <div className={styles.tlCard}>
                    <div className={styles.tlMeta}>
                      {channelChip(s.channel)}
                      <span className={styles.tlFrom}>{s.from}</span>
                    </div>
                    <p className={`said ${styles.tlSaid}`}>
                      “{renderSaid(s.said, s.marks as Mark[])}”
                    </p>

                    {!isClose ? (
                      <>
                        <div className={styles.tlFlow} aria-hidden="true">
                          <span className={styles.tlFlowLine} />
                          <span className={`kept ${styles.tlChip}`}>{s.entry.ref}</span>
                        </div>
                        <div className={styles.tlEntry}>
                          <div className={styles.tlEntryLine}>
                            <span className={`kept ${styles.tlRef}`}>{s.entry.ref}</span>
                            <span className={styles.tlDesc}>{s.entry.desc}</span>
                            <span className={`kept ${styles.tlFig}`}>{s.entry.fig}</span>
                          </div>
                          <span className={styles.tlStamp}>{s.stamp}</span>
                        </div>
                      </>
                    ) : (
                      <div className={styles.tlSheet}>
                        <div className={styles.tlSheetHead}>
                          <span className={`kept ${styles.tlSheetTitle}`}>{ledgerTitle}</span>
                          <span className={`kept ${styles.tlSheetDay}`}>{dayLabel}</span>
                        </div>
                        {rowSteps.map((r, j) => (
                          <div key={j} className={styles.tlSheetRow}>
                            <span className={`kept ${styles.tlSheetTime}`}>{r.time}</span>
                            <span className={`kept ${styles.tlSheetRef}`}>{r.entry.ref}</span>
                            <span className={`kept ${styles.tlSheetFig}`}>{r.entry.fig}</span>
                            <span className={styles.tlSheetStamp}>{r.stamp}</span>
                          </div>
                        ))}
                        <div className={styles.tlSheetRule} />
                        <div className={styles.tlSheetTotal}>
                          <span className={`kept ${styles.tlSheetTotalText}`}>{close.totals}</span>
                          <span className={styles.tlGrandStamp}>{close.stamp}</span>
                        </div>
                      </div>
                    )}

                    <p className={styles.tlCaption}>{s.caption}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <dl className={styles.tlMetrics}>
            {metrics.map((m) => (
              <div key={m.label} className={styles.metric}>
                <dd className={`kept ${styles.metricValue}`}>{fmtMetric(m.to, m.to, m.suffix)}</dd>
                <dt className={styles.metricLabel}>{m.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>
    );
  }

  /* ── Desktop: the pinned, scrubbed day ────────────────────────────────────── */
  const hourTicks: number[] = [];
  for (let h = 7 * 60; h <= 17 * 60; h += 60) hourTicks.push((h - DAY_START) / DAY_SPAN);

  return (
    <section
      id="story"
      ref={section}
      className={styles.section}
      style={{ height: `${Math.round((INTRO_U + (steps.length - 1) * STEP_U + FINALE_U) * VH_PER_U)}vh` }}
      aria-labelledby="story-h"
    >
      <div className={styles.pin}>
        {/* The sky — dawn to dusk across the whole stage. */}
        <div ref={sky} className={styles.sky} aria-hidden="true">
          <span ref={skyDawn} className={`${styles.skyLayer} ${styles.skyDawn}`} />
          <span ref={skyNoon} className={`${styles.skyLayer} ${styles.skyNoon}`} />
          <span ref={skyDusk} className={`${styles.skyLayer} ${styles.skyDusk}`} />
          <span ref={sun} className={styles.sun}>
            <span className={styles.sunCore} />
          </span>
          <span className={styles.skyline} />
        </div>

        <div className={`container ${styles.inner}`}>
          <header className={styles.head}>
            <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
            <h2 id="story-h" className={`said ${styles.heading}`}>{heading}</h2>
            <p className={styles.sub}>{sub}</p>
          </header>

          <div ref={stage} className={styles.stage}>
            {/* ── What's said ── */}
            <div className={styles.inbox}>
              <span className={styles.colLabel}>{saidLabel}</span>
              <div className={styles.msgStack}>
                <p ref={quietEl} className={`said ${styles.quiet}`}>{quiet}</p>
                {steps.map((s, i) => (
                  <article
                    key={i}
                    ref={(el) => { msgs.current[i] = el; }}
                    className={styles.msg}
                  >
                    <div className={styles.msgMeta}>
                      {channelChip(s.channel)}
                      <span className={styles.msgFrom}>{s.from}</span>
                      <span className={`kept ${styles.msgTime}`}>{s.time}</span>
                    </div>
                    <p className={`said ${styles.msgText}`}>
                      “{renderSaid(s.said, s.marks as Mark[])}”
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* ── The books ── */}
            <div className={styles.ledger}>
              <span className={styles.colLabel}>{keptLabel}</span>
              <div ref={sheet} className={styles.sheet}>
                <div className={styles.sheetHead}>
                  <span className={`kept ${styles.sheetTitle}`}>{ledgerTitle}</span>
                  <span className={`kept ${styles.sheetDay}`}>{dayLabel}</span>
                </div>
                <div className={styles.sheetCols} aria-hidden="true">
                  <span>Time</span><span>Ref</span><span>Entry</span><span className={styles.colFig}>Fig.</span>
                </div>

                {rowSteps.map((s, i) => (
                  <div
                    key={i}
                    ref={(el) => { rows.current[i] = el; }}
                    className={styles.row}
                  >
                    <div
                      ref={(el) => { rowInners.current[i] = el; }}
                      className={styles.rowInner}
                    >
                      <span className={`kept ${styles.cellTime}`}>{s.time}</span>
                      <span
                        ref={(el) => { rowRefCells.current[i] = el; }}
                        className={`kept ${styles.cellRef}`}
                      >
                        {s.entry.ref}
                      </span>
                      <span className={styles.cellDesc}>{s.entry.desc}</span>
                      <span className={`kept ${styles.cellFig}`}>{s.entry.fig}</span>
                    </div>
                    <span className={styles.stampSlot}>
                      <span
                        ref={(el) => { stamps.current[i] = el; }}
                        className={styles.stamp}
                      >
                        {s.stamp}
                      </span>
                      <span
                        ref={(el) => { stampRings.current[i] = el; }}
                        className={styles.stampRing}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                ))}

                {[0, 1].map((b) => (
                  <div key={`b${b}`} className={`${styles.row} ${styles.rowBlank}`} aria-hidden="true" />
                ))}

                <div ref={totalRule} className={styles.totalRule} aria-hidden="true" />
                <div className={styles.totalRow}>
                  <div ref={totalInner} className={styles.totalInner}>
                    <span className={`kept ${styles.totalText}`}>{close.totals}</span>
                  </div>
                  <span className={styles.grandSlot}>
                    <span ref={grandStamp} className={styles.grandStamp}>{close.stamp}</span>
                    <span ref={grandRing} className={styles.grandRing} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>

            {/* ── The dockets in flight ── */}
            <div className={styles.flightLayer} aria-hidden="true">
              {rowSteps.map((s, i) => (
                <div key={i} ref={(el) => { chipXs.current[i] = el; }} className={styles.chipX}>
                  <div ref={(el) => { chipYs.current[i] = el; }} className={styles.chipY}>
                    <span ref={(el) => { chips.current[i] = el; }} className={`kept ${styles.chip}`}>
                      {s.entry.ref}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.captionWrap}>
            {steps.map((s, i) => (
              <p
                key={i}
                ref={(el) => { captions.current[i] = el; }}
                className={styles.caption}
              >
                {s.caption}
              </p>
            ))}
          </div>

          {/* ── The working-day rail ── */}
          <div className={styles.rail}>
            <div className={styles.clockBox}>
              <span className={styles.clockLabel}>The working day</span>
              <span ref={clock} className={`kept ${styles.clock}`}>06:30</span>
            </div>
            <div ref={track} className={styles.track} aria-hidden="true">
              <span className={styles.trackLine} />
              {hourTicks.map((f, i) => (
                <span key={i} className={styles.tick} style={{ left: `${f * 100}%` }} />
              ))}
              {steps.map((s, i) => (
                <span
                  key={s.time}
                  ref={(el) => { dots.current[i] = el; }}
                  className={styles.eventDot}
                  style={{ left: `${((stepMins[i] - DAY_START) / DAY_SPAN) * 100}%` }}
                />
              ))}
              <span ref={needle} className={styles.needle} />
              <span className={`kept ${styles.trackEnd} ${styles.trackStart}`}>06:30</span>
              <span className={`kept ${styles.trackEnd} ${styles.trackFinish}`}>18:00</span>
            </div>
            <dl className={styles.metrics}>
              {metrics.map((m, i) => (
                <div key={m.label} className={styles.metric}>
                  <dd
                    ref={(el) => { metricEls.current[i] = el; }}
                    className={`kept ${styles.metricValue}`}
                  >
                    {`0${m.suffix ?? ''}`}
                  </dd>
                  <dt className={styles.metricLabel}>{m.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
