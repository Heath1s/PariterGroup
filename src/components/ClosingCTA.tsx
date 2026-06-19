import { useState, type FormEvent } from 'react';
import { useInView } from '../hooks/useInView';
import styles from './ClosingCTA.module.css';

type FormState = 'idle' | 'submitting' | 'success';

interface Fields {
  name: string;
  company: string;
  email: string;
  message: string;
}

export default function ClosingCTA() {
  const { ref: leftRef, inView: leftIn } = useInView(0.08);
  const { ref: rightRef, inView: rightIn } = useInView(0.08);

  const [state, setState] = useState<FormState>('idle');
  const [fields, setFields] = useState<Fields>({ name: '', company: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<Fields>>({});

  const validate = (): Partial<Fields> => {
    const e: Partial<Fields> = {};
    if (!fields.name.trim()) e.name = 'Please enter your name.';
    if (!fields.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = 'Please enter a valid email address.';
    }
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (errors[name as keyof Fields]) {
      setErrors(er => ({ ...er, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setState('submitting');
    setTimeout(() => setState('success'), 800);
  };

  return (
    <section id="contact" className={styles.section} aria-labelledby="cta-heading">
      <div className="container">
        <div className={styles.grid}>
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            className={`${styles.left} reveal ${leftIn ? 'in-view' : ''}`}
          >
            <p className={`section-eyebrow ${styles.eyebrow}`}>Start with an audit</p>
            <h2 id="cta-heading" className={styles.heading}>
              The right first step is a clear picture.
            </h2>
            <p className={styles.copy}>
              A paid engagement — a close look at where your team's time goes and what it costs.
              No commitment beyond that. An honest picture of your business, in plain English.
            </p>
            <p className={styles.fallback}>
              Or reach us at{' '}
              <a href="mailto:hello@paritergroup.com" className={styles.emailLink}>
                hello@paritergroup.com
              </a>
            </p>
          </div>

          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            className={`${styles.right} reveal ${rightIn ? 'in-view' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            {state === 'success' ? (
              <div className={styles.success} role="status" aria-live="polite">
                <div className={styles.successMark} aria-hidden="true">✓</div>
                <h3 className={styles.successHeading}>We'll be in touch.</h3>
                <p className={styles.successBody}>Usually within one business day.</p>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="cta-name" className={styles.label}>Your name</label>
                    <input
                      id="cta-name"
                      name="name"
                      type="text"
                      value={fields.name}
                      onChange={handleChange}
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      autoComplete="name"
                      aria-describedby={errors.name ? 'cta-name-error' : undefined}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p id="cta-name-error" className={styles.error} role="alert">{errors.name}</p>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="cta-company" className={styles.label}>Company</label>
                    <input
                      id="cta-company"
                      name="company"
                      type="text"
                      value={fields.company}
                      onChange={handleChange}
                      className={styles.input}
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="cta-email" className={styles.label}>Email address</label>
                  <input
                    id="cta-email"
                    name="email"
                    type="email"
                    value={fields.email}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    autoComplete="email"
                    aria-describedby={errors.email ? 'cta-email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="cta-email-error" className={styles.error} role="alert">{errors.email}</p>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="cta-message" className={styles.label}>
                    What's eating your team's time?
                  </label>
                  <textarea
                    id="cta-message"
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows={5}
                  />
                </div>

                <div className={styles.actions}>
                  <button
                    type="submit"
                    className={styles.submit}
                    disabled={state === 'submitting'}
                    aria-busy={state === 'submitting'}
                  >
                    {state === 'submitting' ? 'Sending…' : 'Send it our way'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
