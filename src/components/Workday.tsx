import { useEffect, useRef, useState, type CSSProperties } from 'react';
import workday from '../content/workday.json';
import { gsap, ScrollTrigger } from '../lib/gsap';
import styles from './Workday.module.css';

const DAY_START = 6 * 60 + 30; // 06:30
const DAY_END = 18 * 60; // 18:00
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

function fmtTime(mins: number) {
  const h = Math.floor(mins / 60);
  const m = Math.round(mins % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
function fmtMetric(value: number, to: number, suffix?: string) {
  const v = Number.isInteger(to) ? Math.round(value) : value.toFixed(1);
  return `${v}${suffix ?? ''}`;
}

type Mode = 'scrub' | 'timeline' | 'static';

export default function Workday() {
  const { eyebrow, heading, sub, steps, metrics } = workday;
  const section = useRef<HTMLElement>(null);

  const [mode] = useState<Mode>(() => {
    if (typeof window === 'undefined') return 'static';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'static';
    if (window.matchMedia('(max-width: 860px)').matches) return 'timeline';
    return 'scrub';
  });

  // ── refs for the desktop scrubbed layout ──
  const said = useRef<(HTMLParagraphElement | null)[]>([]);
  const kept = useRef<(HTMLDivElement | null)[]>([]);
  const captions = useRef<(HTMLParagraphElement | null)[]>([]);
  const stamps = useRef<(HTMLSpanElement | null)[]>([]);
  const token = useRef<HTMLSpanElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const metricEls = useRef<(HTMLSpanElement | null)[]>([]);
  // ── refs for the mobile timeline reveals ──
  const tlItems = useRef<(HTMLLIElement | null)[]>([]);

  const render = (p: number) => {
    const n = steps.length;
    const active = Math.min(n - 1, Math.floor(p * n));
    const local = clamp01(p * n - active);
    if (section.current) section.current.style.setProperty('--day', p.toFixed(3));
    if (token.current) token.current.style.setProperty('--travel', local.toFixed(3));

    const setActive = (arr: (HTMLElement | null)[]) =>
      arr.forEach((el, i) => { if (el) el.style.opacity = i === active ? '1' : '0'; });
    setActive(said.current);
    setActive(kept.current);
    setActive(captions.current);
    stamps.current.forEach((el, i) => {
      if (el) el.style.setProperty('--stamp', i === active ? clamp01((local - 0.6) / 0.2).toFixed(3) : '0');
    });
    if (clock.current) clock.current.textContent = fmtTime(DAY_START + p * (DAY_END - DAY_START));
    metricEls.current.forEach((el, i) => {
      if (!el) return;
      const m = metrics[i];
      const eased = 1 - Math.pow(1 - p, 2);
      el.textContent = fmtMetric(m.to * eased, m.to, m.suffix);
    });
  };

  useEffect(() => {
    if (mode === 'static') return;

    if (mode === 'timeline') {
      // reveal each day-entry as it scrolls into view
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add(styles.tlIn); io.unobserve(e.target); }
        }),
        { threshold: 0.3, rootMargin: '0px 0px -10% 0px' },
      );
      tlItems.current.forEach((el) => el && io.observe(el));
      return () => io.disconnect();
    }

    // mode === 'scrub'
    const sec = section.current;
    if (!sec) return;
    render(0);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top top',
        end: 'bottom bottom',
        pin: `.${styles.pin}`,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => render(self.progress),
      });
    }, sec);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  /* The shared desk illustration — a back-office worker at a glowing monitor,
     the sun climbing in the window behind them through the day. */
  const scene = (
    <div
      className={styles.scene}
      style={mode === 'scrub' ? undefined : ({ '--day': 0.72 } as CSSProperties)}
    >
      <div className={styles.window} aria-hidden="true">
        <span className={styles.deskSun} />
        <span className={styles.horizon} />
      </div>
      <svg className={styles.deskArt} viewBox="0 0 440 360" aria-hidden="true">
        <rect x="24" y="300" width="392" height="13" rx="3" className={styles.deskTop} />
        <rect x="60" y="313" width="9" height="40" className={styles.deskLeg} />
        <rect x="371" y="313" width="9" height="40" className={styles.deskLeg} />
        <rect x="96" y="196" width="16" height="86" rx="8" className={styles.chair} />
        <g className={styles.person}>
          <circle cx="150" cy="178" r="17" />
          <path d="M150 196 C133 198 128 214 129 236 L129 270 L172 270 L170 236 C170 220 166 206 158 200 Z" />
          <path d="M150 214 C168 218 192 232 210 250 L203 262 C184 248 164 240 146 240 Z" />
          <rect x="129" y="266" width="52" height="14" rx="6" />
          <rect x="169" y="266" width="13" height="44" rx="5" />
        </g>
        <g className={styles.monitor}>
          <rect x="236" y="214" width="120" height="78" rx="6" className={styles.screen} />
          <rect x="244" y="222" width="104" height="62" rx="3" className={styles.screenGlow} />
          <rect x="290" y="292" width="12" height="14" className={styles.stand} />
          <rect x="272" y="305" width="48" height="7" rx="3" className={styles.standBase} />
          <line x1="252" y1="236" x2="320" y2="236" className={styles.scanline} />
          <line x1="252" y1="248" x2="332" y2="248" className={styles.scanline} />
          <line x1="252" y1="260" x2="300" y2="260" className={styles.scanline} />
        </g>
      </svg>
      <span className={styles.sceneLabel}>The desk, all day</span>
    </div>
  );

  // ── Mobile / reduced: a vertical timeline of the day ──
  if (mode !== 'scrub') {
    return (
      <section id="story" ref={section} className={styles.section} aria-labelledby="story-h">
        <div className={`container ${styles.tlInner}`}>
          <header className={styles.head}>
            <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
            <h2 id="story-h" className={`said ${styles.heading}`}>{heading}</h2>
            <p className={styles.sub}>{sub}</p>
          </header>

          {scene}

          <ol className={`${styles.tl} ${mode === 'timeline' ? styles.tlAnimated : ''}`}>
            {steps.map((s, i) => (
              <li
                key={i}
                ref={(el) => { tlItems.current[i] = el; }}
                className={styles.tlItem}
              >
                <span className={`kept ${styles.tlTime}`}>{s.time}</span>
                <div className={styles.tlCard}>
                  <span className={styles.tlKind}>{s.kind}</span>
                  <p className={`said ${styles.tlSaid}`}>“{s.said}”</p>
                  <div className={styles.tlKept}>
                    <span className={`kept ${styles.keptCode}`}>{s.kept}</span>
                    <span className={styles.stamp} style={{ '--stamp': 1 } as CSSProperties}>{s.stamp}</span>
                  </div>
                  <p className={styles.tlCaption}>{s.caption}</p>
                </div>
              </li>
            ))}
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

  // ── Desktop: the pinned, scrubbed day ──
  return (
    <section
      id="story"
      ref={section}
      className={styles.section}
      style={{ height: `${(steps.length + 1) * 100}vh` }}
      aria-labelledby="story-h"
    >
      <div className={styles.pin}>
        <div className={`container ${styles.inner}`}>
          <header className={styles.head}>
            <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
            <h2 id="story-h" className={`said ${styles.heading}`}>{heading}</h2>
            <p className={styles.sub}>{sub}</p>
          </header>

          <div className={styles.body}>
            {scene}

            <div className={styles.relay}>
              <div className={styles.said}>
                <span className={styles.relayLabel}>What's said</span>
                <div className={styles.saidStack}>
                  {steps.map((s, i) => (
                    <p
                      key={i}
                      ref={(el) => { said.current[i] = el; }}
                      className={`said ${styles.saidText}`}
                      style={i === 0 ? undefined : { opacity: 0 }}
                    >
                      <span className={styles.saidMeta}>{s.time} · {s.kind}</span>
                      “{s.said}”
                    </p>
                  ))}
                </div>
              </div>

              <div className={styles.conveyor} aria-hidden="true">
                <span className={styles.conveyorLine} />
                <span ref={token} className={styles.token} />
                <span className={styles.conveyorNote}>posts itself</span>
              </div>

              <div className={styles.ledger}>
                <span className={styles.relayLabel}>The books</span>
                <div className={styles.keptStack}>
                  {steps.map((s, i) => (
                    <div
                      key={i}
                      ref={(el) => { kept.current[i] = el; }}
                      className={styles.keptRow}
                      style={i === 0 ? undefined : { opacity: 0 }}
                    >
                      <span className={`kept ${styles.keptCode}`}>{s.kept}</span>
                      <span ref={(el) => { stamps.current[i] = el; }} className={styles.stamp}>{s.stamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.captionWrap}>
            {steps.map((s, i) => (
              <p
                key={i}
                ref={(el) => { captions.current[i] = el; }}
                className={styles.caption}
                style={i === 0 ? undefined : { opacity: 0 }}
              >
                {s.caption}
              </p>
            ))}
          </div>

          <div className={styles.bar}>
            <div className={styles.clockBox}>
              <span className={styles.clockLabel}>Working day</span>
              <span ref={clock} className={`kept ${styles.clock}`}>06:30</span>
            </div>
            <dl className={styles.metrics}>
              {metrics.map((m, i) => (
                <div key={m.label} className={styles.metric}>
                  <dd ref={(el) => { metricEls.current[i] = el; }} className={`kept ${styles.metricValue}`}>
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
