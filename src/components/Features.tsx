import { useInView } from '../hooks/useInView';
import styles from './Features.module.css';

function FragmentedSVG() {
  return (
    <svg width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Email box */}
      <rect x="10" y="20" width="72" height="44" rx="6" stroke="var(--pebble)" strokeWidth="1.5" fill="var(--sand-light)" />
      <text x="46" y="47" textAnchor="middle" fill="var(--ink-muted)" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Email</text>
      {/* Orders box */}
      <rect x="104" y="68" width="72" height="44" rx="6" stroke="var(--pebble)" strokeWidth="1.5" fill="var(--sand-light)" />
      <text x="140" y="95" textAnchor="middle" fill="var(--ink-muted)" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Orders</text>
      {/* Books box */}
      <rect x="198" y="116" width="72" height="44" rx="6" stroke="var(--pebble)" strokeWidth="1.5" fill="var(--sand-light)" />
      <text x="234" y="143" textAnchor="middle" fill="var(--ink-muted)" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Books</text>
      {/* Dashed line Email → Orders */}
      <line x1="82" y1="42" x2="104" y2="79" stroke="var(--pebble)" strokeWidth="1.5" strokeDasharray="4 4" />
      {/* Dashed line Orders → Books */}
      <line x1="176" y1="90" x2="198" y2="128" stroke="var(--pebble)" strokeWidth="1.5" strokeDasharray="4 4" />
    </svg>
  );
}

function ConnectedSVG() {
  return (
    <svg width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Email box */}
      <rect x="10" y="20" width="72" height="44" rx="6" stroke="rgba(168,92,53,0.6)" strokeWidth="1.5" fill="var(--sand-light)" />
      <text x="46" y="47" textAnchor="middle" fill="var(--ink)" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Email</text>
      {/* Orders box */}
      <rect x="104" y="68" width="72" height="44" rx="6" stroke="rgba(168,92,53,0.6)" strokeWidth="1.5" fill="var(--sand-light)" />
      <text x="140" y="95" textAnchor="middle" fill="var(--ink)" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Orders</text>
      {/* Books box */}
      <rect x="198" y="116" width="72" height="44" rx="6" stroke="rgba(168,92,53,0.6)" strokeWidth="1.5" fill="var(--sand-light)" />
      <text x="234" y="143" textAnchor="middle" fill="var(--ink)" fontSize="11" fontFamily="Inter, system-ui, sans-serif">Books</text>
      {/* Solid line Email → Orders */}
      <line x1="82" y1="42" x2="104" y2="79" stroke="rgba(168,92,53,0.6)" strokeWidth="2" />
      {/* Arrow head */}
      <polygon points="100,74 108,82 96,84" fill="rgba(168,92,53,0.6)" />
      {/* Solid line Orders → Books */}
      <line x1="176" y1="90" x2="198" y2="128" stroke="rgba(168,92,53,0.6)" strokeWidth="2" />
      {/* Arrow head */}
      <polygon points="194,123 202,131 190,133" fill="rgba(168,92,53,0.6)" />
    </svg>
  );
}

function TrendSVG() {
  return (
    <svg width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <line x1="30" y1="150" x2="260" y2="150" stroke="var(--pebble)" strokeWidth="1.5" />
      <line x1="30" y1="20" x2="30" y2="150" stroke="var(--pebble)" strokeWidth="1.5" />
      {/* Upward trend line */}
      <polyline
        points="30,140 70,130 110,115 150,95 200,70 250,40"
        stroke="var(--clay)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Area fill */}
      <polygon
        points="30,140 70,130 110,115 150,95 200,70 250,40 250,150 30,150"
        fill="rgba(168,92,53,0.08)"
      />
      {/* Dots */}
      <circle cx="70" cy="130" r="3.5" fill="var(--clay)" />
      <circle cx="110" cy="115" r="3.5" fill="var(--clay)" />
      <circle cx="150" cy="95" r="3.5" fill="var(--clay)" />
      <circle cx="200" cy="70" r="3.5" fill="var(--clay)" />
      <circle cx="250" cy="40" r="3.5" fill="var(--clay)" />
    </svg>
  );
}

interface FeatureProps {
  eyebrow: string;
  heading: string;
  copy: string;
  linkText: string;
  linkHref: string;
  visual: React.ReactNode;
  reverse?: boolean;
  bg: string;
}

function Feature({ eyebrow, heading, copy, linkText, linkHref, visual, reverse, bg }: FeatureProps) {
  const { ref, inView } = useInView(0.1);

  return (
    <section className={styles.feature} style={{ background: bg }}>
      <div className="container">
        <div className={`${styles.grid} ${reverse ? styles.reverse : ''}`}>
          <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`${styles.text} reveal ${inView ? 'in-view' : ''}`}
          >
            <p className={`section-eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
            <h2 className={styles.heading}>{heading}</h2>
            <p className={styles.copy}>{copy}</p>
            <a href={linkHref} className={styles.link}>{linkText}</a>
          </div>
          <div className={styles.visual}>
            {visual}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Features() {
  return (
    <>
      <Feature
        eyebrow="The problem"
        heading="Hours lost every week to manual admin"
        copy="Most businesses run on tools that don't talk to each other. Someone copies orders from email into the job system. Someone else keys those numbers into the books. Across a week, it adds up to hours your team didn't need to spend."
        linkText="See how we fix it →"
        linkHref="#approach"
        visual={<FragmentedSVG />}
        bg="var(--stone)"
      />
      <Feature
        eyebrow="What we do"
        heading="We connect your tools and eliminate the relay"
        copy="We build the plumbing between your existing systems — so orders flow to the books automatically, invoices get where they need to go, and your people stop acting as the bridge."
        linkText="Our approach →"
        linkHref="#approach"
        visual={<ConnectedSVG />}
        reverse
        bg="var(--sand)"
      />
      <Feature
        eyebrow="The result"
        heading="Your team gets back to the work they were hired for"
        copy="When the manual relay disappears, the time doesn't vanish — it moves. Toward quoting jobs, serving customers, making decisions. The work that actually grows the business."
        linkText="Start with an audit →"
        linkHref="#contact"
        visual={<TrendSVG />}
        bg="var(--stone)"
      />
    </>
  );
}
