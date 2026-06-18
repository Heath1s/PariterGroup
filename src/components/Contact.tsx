import { useState, type FormEvent } from 'react';
import styles from './Contact.module.css';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [state, setState] = useState<FormState>('idle');
  const [fields, setFields] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<typeof fields>>({});

  const validate = () => {
    const e: Partial<typeof fields> = {};
    if (!fields.name.trim())    e.name    = 'Please enter your name.';
    if (!fields.company.trim()) e.company = 'Please enter your company name.';
    if (!fields.email.trim())   e.email   = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                                e.email   = 'Please enter a valid email address.';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(er => ({ ...er, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setState('submitting');
    console.log('[Pariter Group — Contact Form submission]', fields);

    // Simulate async — no backend for v1
    setTimeout(() => setState('success'), 800);
  };

  if (state === 'success') {
    return (
      <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
        <div className={`container ${styles.inner}`}>
          <div className={styles.success} role="status" aria-live="polite">
            <div className={styles.successMark} aria-hidden="true">✓</div>
            <h2 className={styles.successHeading}>We'll be in touch shortly.</h2>
            <p className={styles.successBody}>
              Thanks for reaching out. We aim to reply within one business day —
              usually sooner.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="section-label">Start with an audit</span>
          <h2 id="contact-heading" className={styles.heading}>
            The right first step is a clear picture.
          </h2>
          <p className={styles.sub}>
            The audit is a paid engagement — a close look at where your team's
            time actually goes and what it costs you. No commitment beyond that.
            Just an honest picture of the business, in plain English.
          </p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
        >
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={fields.name}
                onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                autoComplete="name"
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p id="name-error" className={styles.error} role="alert">{errors.name}</p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="company" className={styles.label}>Company</label>
              <input
                id="company"
                name="company"
                type="text"
                value={fields.company}
                onChange={handleChange}
                className={`${styles.input} ${errors.company ? styles.inputError : ''}`}
                autoComplete="organization"
                aria-describedby={errors.company ? 'company-error' : undefined}
                aria-invalid={!!errors.company}
              />
              {errors.company && (
                <p id="company-error" className={styles.error} role="alert">{errors.company}</p>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              autoComplete="email"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p id="email-error" className={styles.error} role="alert">{errors.email}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>
              What's eating your team's time?
              <span className={styles.labelOptional}> (optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={fields.message}
              onChange={handleChange}
              className={styles.textarea}
              rows={5}
              placeholder="The more specific, the more useful — but even a sentence helps."
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

            <p className={styles.fallback}>
              Or email us directly at{' '}
              <a href="mailto:hello@paritergroup.com" className={styles.emailLink}>
                hello@paritergroup.com
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
