import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useEnter } from '../hooks/useScrollMotion';
import Docket from './Docket';
import styles from './Contact.module.css';

type Fields = { name: string; company: string; email: string; message: string };

export default function Contact() {
  const ref = useEnter<HTMLElement>();
  const [done, setDone] = useState(false);
  const [fields, setFields] = useState<Fields>({ name: '', company: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<Fields>>({});

  const validate = () => {
    const e: Partial<Fields> = {};
    if (!fields.name.trim()) e.name = 'Please enter your name.';
    if (!fields.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Please enter a valid email address.';
    return e;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (errors[name as keyof Fields]) setErrors(er => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    console.log('[Pariter Group — audit request]', fields);
    setDone(true);
  };

  return (
    <section id="contact" ref={ref} className={styles.contact} aria-labelledby="contact-h">
      <div className="container">
        {/* The close: the working day reconciles itself — the mirror of the
            morning order that cleared at the top of the page. */}
        <div className={styles.close}>
          <p className="eyebrow">End of day</p>
          <h2 className={`said ${styles.closeHeading} rise`}>The day reconciles itself.</h2>
          <div className={`${styles.summaryWrap} rise`}>
            <Docket
              code="EOD-2041"
              kind="Day ledger"
              said="Everything said today reached the books today."
              rows={[
                { label: 'Orders cleared', value: '47' },
                { label: 'Re-keyed by hand', value: '0' },
                { label: 'Hours given back', value: '≈ 2.5 / person' },
              ]}
              stamp="Reconciled"
              note="06:30 opened · 18:00 closed"
              animateStamp
            />
          </div>
          <p className={`said ${styles.closePull}`}>Side by side, at the pace you set.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.intro}>
            <p className="eyebrow">Start with an audit</p>
            <h2 id="contact-h" className={`said ${styles.heading}`}>
              The right first step is a clear picture.
            </h2>
            <p className={styles.body}>
              A paid engagement — a close look at where your team's time goes and what it
              costs. No commitment beyond that. An honest picture of your business, in
              plain English.
            </p>
            <p className={styles.fallback}>
              Or reach us at{' '}
              <a href="mailto:hello@paritergroup.com" className={styles.email}>
                hello@paritergroup.com
              </a>
            </p>
          </div>

          <div className={styles.formWrap}>
            {done ? (
              <div className={styles.success} role="status" aria-live="polite">
                <span className={styles.check} aria-hidden="true">✓</span>
                <h3 className={`said ${styles.successH}`}>We'll be in touch.</h3>
                <p className={styles.body}>Usually within one business day — often sooner.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate aria-label="Request an audit">
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>Your name</label>
                    <input id="name" name="name" type="text" value={fields.name} onChange={onChange}
                      className={`${styles.input} ${errors.name ? styles.invalid : ''}`}
                      autoComplete="name" aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-err' : undefined} />
                    {errors.name && <p id="name-err" className={styles.err} role="alert">{errors.name}</p>}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="company" className={styles.label}>Company</label>
                    <input id="company" name="company" type="text" value={fields.company} onChange={onChange}
                      className={styles.input} autoComplete="organization" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>Email address</label>
                  <input id="email" name="email" type="email" value={fields.email} onChange={onChange}
                    className={`${styles.input} ${errors.email ? styles.invalid : ''}`}
                    autoComplete="email" aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-err' : undefined} />
                  {errors.email && <p id="email-err" className={styles.err} role="alert">{errors.email}</p>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>
                    What's eating your team's time? <span className={styles.opt}>(optional)</span>
                  </label>
                  <textarea id="message" name="message" rows={4} value={fields.message} onChange={onChange}
                    className={styles.textarea}
                    placeholder="Even a sentence helps — the more specific, the more useful." />
                </div>

                <button type="submit" className={`btn ${styles.submit}`}>
                  Send it our way <span className="arrow" aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
