import Head from 'next/head';
import { useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  category: '',
  subject: '',
  relatedUrl: '',
  message: '',
  consent: false,
  website: '',
};

const paragraphStyle = {
  color: 'var(--text-muted)',
  fontSize: '16px',
  lineHeight: '1.8',
  marginBottom: '16px',
};

const headingStyle = {
  fontSize: '22px',
  lineHeight: '1.4',
  marginTop: '36px',
  marginBottom: '12px',
};

const labelStyle = {
  display: 'block',
  color: 'var(--text)',
  fontSize: '15px',
  fontWeight: '600',
  marginBottom: '8px',
};

const inputStyle = {
  width: '100%',
  minHeight: '48px',
  padding: '12px 14px',
  color: 'var(--text)',
  background: 'var(--surface, transparent)',
  border: '1px solid var(--border, #d8d8d8)',
  borderRadius: '8px',
  fontSize: '16px',
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
};

const linkStyle = {
  color: 'var(--accent, #1F7A6C)',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
};

const contactOptions = [
  {
    title: 'Report Incorrect Data',
    description:
      'Tell us about inaccurate country facts, emergency numbers, weather information, currency data, or location details.',
  },
  {
    title: 'Suggest a Location',
    description:
      'Recommend a city, country, region, or location-based feature that you would like to see on Locafacts.',
  },
  {
    title: 'Technical Support',
    description:
      'Report broken pages, display problems, loading errors, or features that are not working correctly.',
  },
  {
    title: 'Privacy and Legal',
    description:
      'Contact us about privacy requests, copyright concerns, website policies, or other legal matters.',
  },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: '',
      }));
    }

    setStatusMessage('');
  };

  const validateForm = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!form.category) {
      nextErrors.category = 'Please select an inquiry category.';
    }

    if (form.subject.trim().length < 3) {
      nextErrors.subject = 'Please enter a clear subject.';
    }

    if (form.message.trim().length < 20) {
      nextErrors.message =
        'Please provide at least 20 characters so we can understand your request.';
    }

    if (!form.consent) {
      nextErrors.consent =
        'Please confirm that you agree to send this information by email.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Honeypot field for basic spam protection.
    if (form.website) {
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatusMessage(
        'Please review the highlighted fields before continuing.'
      );
      return;
    }

    const emailBody = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Category: ${form.category}`,
      form.relatedUrl.trim()
        ? `Related page: ${form.relatedUrl.trim()}`
        : null,
      '',
      'Message:',
      form.message.trim(),
    ]
      .filter(Boolean)
      .join('\n');

    const mailtoUrl =
      `mailto:support@locafacts.com` +
      `?subject=${encodeURIComponent(
        `[${form.category}] ${form.subject.trim()}`
      )}` +
      `&body=${encodeURIComponent(emailBody)}`;

    setStatusMessage(
      'Your email application is opening. Review the message and press Send.'
    );

    window.location.href = mailtoUrl;
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Locafacts',
    description:
      'Contact Locafacts to report incorrect information, suggest locations, request support, or ask privacy-related questions.',
    url: 'https://locafacts.com/contact',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Locafacts',
      url: 'https://locafacts.com',
    },
  };

  return (
    <>
      <Head>
        <title>Contact Locafacts | Questions, Corrections and Feedback</title>

        <meta
          name="description"
          content="Contact Locafacts to report incorrect location data, suggest a city, request technical support, or ask a privacy-related question."
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://locafacts.com/contact" />

        <meta
          property="og:title"
          content="Contact Locafacts | Questions, Corrections and Feedback"
        />

        <meta
          property="og:description"
          content="Report incorrect data, suggest a location, request support, or contact the Locafacts team."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locafacts.com/contact" />
        <meta property="og:site_name" content="Locafacts" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <main
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '60px 24px',
        }}
      >
        <article>
          <header style={{ marginBottom: '36px' }}>
            <p
              style={{
                color: 'var(--accent, #1F7A6C)',
                fontSize: '14px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Contact Locafacts
            </p>

            <h1
              className="font-display"
              style={{
                fontSize: '40px',
                lineHeight: '1.2',
                marginBottom: '18px',
              }}
            >
              How can we help?
            </h1>

            <p
              style={{
                ...paragraphStyle,
                maxWidth: '720px',
                fontSize: '17px',
              }}
            >
              Contact us to report incorrect information, suggest a location,
              request technical assistance, or ask a question about Locafacts.
              Clear and detailed messages help us review requests more
              effectively.
            </p>
          </header>

          <section aria-labelledby="contact-reasons">
            <h2
              id="contact-reasons"
              className="font-display"
              style={{
                ...headingStyle,
                marginTop: '0',
              }}
            >
              Reasons to Contact Us
            </h2>

            <div className="contact-grid">
              {contactOptions.map((option) => (
                <div className="contact-card" key={option.title}>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '18px',
                      marginTop: '0',
                      marginBottom: '10px',
                    }}
                  >
                    {option.title}
                  </h3>

                  <p
                    style={{
                      ...paragraphStyle,
                      fontSize: '15px',
                      marginBottom: '0',
                    }}
                  >
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="before-contacting">
            <h2
              id="before-contacting"
              className="font-display"
              style={headingStyle}
            >
              Reporting Incorrect Information
            </h2>

            <p style={paragraphStyle}>
              When reporting inaccurate or outdated information, please include
              enough detail for us to locate and review it. Helpful information
              includes:
            </p>

            <ul
              style={{
                ...paragraphStyle,
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '10px' }}>
                The URL of the affected Locafacts page
              </li>

              <li style={{ marginBottom: '10px' }}>
                The specific information you believe is incorrect
              </li>

              <li style={{ marginBottom: '10px' }}>
                The corrected information
              </li>

              <li style={{ marginBottom: '10px' }}>
                A link to an official or authoritative source
              </li>

              <li>The date you noticed the issue</li>
            </ul>

            <p style={paragraphStyle}>
              For emergency numbers, government details, borders, public-health
              information, or other sensitive data, an official government or
              recognized institutional source is preferred.
            </p>
          </section>

          <section
            aria-labelledby="contact-form-heading"
            style={{
              marginTop: '40px',
              padding: '28px',
              background: 'var(--surface, rgba(0, 0, 0, 0.02))',
              border: '1px solid var(--border, #dddddd)',
              borderRadius: '12px',
            }}
          >
            <h2
              id="contact-form-heading"
              className="font-display"
              style={{
                fontSize: '26px',
                marginTop: '0',
                marginBottom: '10px',
              }}
            >
              Send a Message
            </h2>

            <p style={paragraphStyle}>
              Complete the form below. When submitted, your default email
              application will open with the message prepared for you.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div>
                  <label htmlFor="name" style={labelStyle}>
                    Your name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    maxLength={80}
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? 'name-error' : undefined
                    }
                    style={inputStyle}
                  />

                  {errors.name && (
                    <p id="name-error" className="field-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    maxLength={160}
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? 'email-error' : undefined
                    }
                    style={inputStyle}
                  />

                  {errors.email && (
                    <p id="email-error" className="field-error">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <label htmlFor="category" style={labelStyle}>
                  Inquiry category
                </label>

                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.category)}
                  aria-describedby={
                    errors.category ? 'category-error' : undefined
                  }
                  style={inputStyle}
                >
                  <option value="">Select a category</option>
                  <option value="Data correction">Data correction</option>
                  <option value="Location suggestion">
                    Location suggestion
                  </option>
                  <option value="Technical support">Technical support</option>
                  <option value="Privacy request">Privacy request</option>
                  <option value="Copyright concern">Copyright concern</option>
                  <option value="Business inquiry">Business inquiry</option>
                  <option value="General question">General question</option>
                </select>

                {errors.category && (
                  <p id="category-error" className="field-error">
                    {errors.category}
                  </p>
                )}
              </div>

              <div style={{ marginTop: '20px' }}>
                <label htmlFor="subject" style={labelStyle}>
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  maxLength={120}
                  required
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={
                    errors.subject ? 'subject-error' : undefined
                  }
                  placeholder="Briefly describe your request"
                  style={inputStyle}
                />

                {errors.subject && (
                  <p id="subject-error" className="field-error">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div style={{ marginTop: '20px' }}>
                <label htmlFor="relatedUrl" style={labelStyle}>
                  Related Locafacts page
                  <span
                    style={{
                      color: 'var(--text-muted)',
                      fontWeight: '400',
                    }}
                  >
                    {' '}
                    (optional)
                  </span>
                </label>

                <input
                  id="relatedUrl"
                  name="relatedUrl"
                  type="url"
                  value={form.relatedUrl}
                  onChange={handleChange}
                  maxLength={500}
                  placeholder="https://locafacts.com/example-page"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginTop: '20px' }}>
                <label htmlFor="message" style={labelStyle}>
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={8}
                  maxLength={3000}
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby="message-help message-error"
                  placeholder="Describe your question, correction, suggestion, or technical issue."
                  style={{
                    ...inputStyle,
                    minHeight: '180px',
                    resize: 'vertical',
                  }}
                />

                <div className="message-meta">
                  <span id="message-help">
                    Include relevant details and official sources where
                    possible.
                  </span>

                  <span>{form.message.length}/3000</span>
                </div>

                {errors.message && (
                  <p id="message-error" className="field-error">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Hidden honeypot field */}
              <div
                className="honeypot"
                aria-hidden="true"
              >
                <label htmlFor="website">
                  Leave this field empty
                </label>

                <input
                  id="website"
                  name="website"
                  type="text"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div style={{ marginTop: '22px' }}>
                <label className="consent-label">
                  <input
                    name="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={handleChange}
                    required
                    style={{
                      width: '18px',
                      height: '18px',
                      marginTop: '3px',
                      flexShrink: '0',
                    }}
                  />

                  <span>
                    I understand that this information will be included in an
                    email sent to Locafacts. I have not included unnecessary
                    sensitive personal information.
                  </span>
                </label>

                {errors.consent && (
                  <p className="field-error">{errors.consent}</p>
                )}
              </div>

              {statusMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    marginTop: '20px',
                    padding: '14px 16px',
                    color: 'var(--text)',
                    background: 'var(--background, #ffffff)',
                    border: '1px solid var(--border, #dddddd)',
                    borderRadius: '8px',
                    fontSize: '15px',
                    lineHeight: '1.6',
                  }}
                >
                  {statusMessage}
                </div>
              )}

              <button
                type="submit"
                style={{
                  minHeight: '48px',
                  marginTop: '24px',
                  padding: '12px 22px',
                  color: '#ffffff',
                  background: 'var(--accent, #1F7A6C)',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
              >
                Prepare Email
              </button>
            </form>
          </section>

          <section aria-labelledby="direct-contact">
            <h2
              id="direct-contact"
              className="font-display"
              style={headingStyle}
            >
              Contact by Email
            </h2>

            <p style={paragraphStyle}>
              You can also contact Locafacts directly at:
            </p>

            <address
              style={{
                ...paragraphStyle,
                fontStyle: 'normal',
                padding: '22px',
                border: '1px solid var(--border, #dddddd)',
                borderRadius: '10px',
              }}
            >
              <strong>Email:</strong>{' '}
              <a
                href="mailto:support@locafacts.com"
                style={linkStyle}
              >
                support@locafacts.com
              </a>
              <br />

              <strong>Website:</strong>{' '}
              <a
                href="https://locafacts.com"
                style={linkStyle}
              >
                locafacts.com
              </a>
            </address>

            <p style={paragraphStyle}>
              Response times may vary depending on the type and complexity of
              the request. Sending repeated copies of the same message may
              delay review.
            </p>
          </section>

          <section aria-labelledby="privacy-note">
            <h2
              id="privacy-note"
              className="font-display"
              style={headingStyle}
            >
              Privacy Notice
            </h2>

            <p style={paragraphStyle}>
              Please avoid including passwords, payment details, government
              identification numbers, medical records, or other sensitive
              information in your message.
            </p>

            <p style={paragraphStyle}>
              Information you send will be used to review and respond to your
              request. For more information, read our{' '}
              <a href="/privacy-policy" style={linkStyle}>
                Privacy Policy
              </a>
              .
            </p>
          </section>
        </article>
      </main>

      <style jsx>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 20px;
        }

        .contact-card {
          padding: 22px;
          border: 1px solid var(--border, #dddddd);
          border-radius: 10px;
          background: var(--surface, transparent);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-top: 24px;
        }

        .field-error {
          color: #b42318;
          font-size: 14px;
          line-height: 1.5;
          margin: 7px 0 0;
        }

        .message-meta {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          color: var(--text-muted);
          font-size: 13px;
          line-height: 1.5;
          margin-top: 7px;
        }

        .consent-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: var(--text-muted);
          font-size: 14px;
          line-height: 1.6;
          cursor: pointer;
        }

        .honeypot {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        input:focus,
        select:focus,
        textarea:focus {
          border-color: var(--accent, #1f7a6c) !important;
          box-shadow: 0 0 0 3px rgba(31, 122, 108, 0.14);
        }

        button:hover {
          opacity: 0.92;
        }

        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible {
          outline: 3px solid rgba(31, 122, 108, 0.25);
          outline-offset: 3px;
        }

        @media (max-width: 680px) {
          .contact-grid,
          .form-grid {
            grid-template-columns: 1fr;
          }

          .message-meta {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </>
  );
}