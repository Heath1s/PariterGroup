import { useState, type ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import styles from './Docket.module.css';

export type DocketRow = { label: string; value: string };

type DocketProps = {
  code: string;                 // form/document number, e.g. "ORD-2041"
  kind: string;                 // document type, e.g. "Order confirmation"
  said?: string;                // the human line, in the serif voice
  rows?: DocketRow[];           // ledger rows (mono, dotted leaders)
  stamp?: string;               // rubber-stamp text, e.g. "Cleared"
  note?: string;                // small footnote
  held?: boolean;               // the jammed look — awaiting a hand
  animateStamp?: boolean;       // play the impact reveal when scrolled into view
  className?: string;
  children?: ReactNode;
};

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A crisp typed document. Reused across the page as the thing that travels the
 * line and gets handled. The stamp is static-first: it renders visible with no
 * JS; when motion is allowed it arms (hidden) and lands with an impact ease as
 * the docket scrolls into view.
 */
export default function Docket({
  code, kind, said, rows, stamp, note, held = false,
  animateStamp = false, className = '', children,
}: DocketProps) {
  const { ref, inView } = useInView(0.35);
  // Arm the stamp at mount only when motion is allowed; with reduced motion it
  // stays at rest (visible), so the document still reads as finished.
  const [armed] = useState(() => animateStamp && !prefersReduced());

  const stampCls = !armed
    ? styles.stampRest
    : inView
      ? styles.stampLand
      : styles.stampArmed;

  return (
    <article
      ref={ref}
      className={`${styles.docket} ${held ? styles.held : ''} ${className}`}
    >
      <div className={styles.perf} aria-hidden="true" />

      <header className={styles.head}>
        <span className={styles.code}>{code}</span>
        <span className={styles.kind}>{kind}</span>
      </header>
      <div className={styles.headRule} aria-hidden="true" />

      {said && <p className={`said ${styles.said}`}>{said}</p>}

      {rows && rows.length > 0 && (
        <dl className={styles.rows}>
          {rows.map((r) => (
            <div key={r.label} className={styles.row}>
              <dt className={styles.rowLabel}>{r.label}</dt>
              <span className={styles.leader} aria-hidden="true" />
              <dd className={styles.rowValue}>{r.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {children}

      {note && <p className={styles.note}>{note}</p>}

      {stamp && (
        <span className={`${styles.stamp} ${held ? styles.stampHeld : ''} ${stampCls}`}>
          {stamp}
        </span>
      )}
    </article>
  );
}
