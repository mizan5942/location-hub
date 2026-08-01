import Head from 'next/head';

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

const listStyle = {
  ...paragraphStyle,
  paddingLeft: '24px',
};

const linkStyle = {
  color: '#1F7A6C',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
};

export default function Disclaimer() {
  return (
    <>
      <Head>
        <title>Disclaimer | Locafacts</title>

        <meta
          name="description"
          content="Read the Locafacts disclaimer concerning third-party location data, weather, air quality, currency rates, emergency numbers, and other information."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://locafacts.com/disclaimer"
        />
      </Head>

      <main
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '60px 24px',
        }}
      >
        <article>
          <header>
            <h1
              className="font-display"
              style={{
                fontSize: '38px',
                lineHeight: '1.2',
                marginBottom: '12px',
              }}
            >
              Disclaimer
            </h1>

            <p
              style={{
                ...paragraphStyle,
                fontSize: '14px',
                marginBottom: '28px',
              }}
            >
              Last updated:{' '}
              <time dateTime="2026-07-31">July 31, 2026</time>
            </p>
          </header>

          <p style={paragraphStyle}>
            The information provided on Locafacts is intended solely for
            general informational and educational purposes. While we aim to
            make the website useful and keep its content reasonably current,
            we cannot guarantee that every fact, figure, result, or data point
            is accurate, complete, available, or up to date.
          </p>

          <p style={paragraphStyle}>
            By using Locafacts, you acknowledge that information displayed on
            the website may come from third-party services and may change
            without notice. You are responsible for independently verifying
            important information before relying on it.
          </p>

          <section aria-labelledby="general-information">
            <h2
              id="general-information"
              className="font-display"
              style={headingStyle}
            >
              1. General Information Only
            </h2>

            <p style={paragraphStyle}>
              Locafacts provides location-related facts and reference
              information, which may include country information, geographic
              details, local time, time zones, weather conditions, currency
              exchange rates, air-quality information, emergency contact
              numbers, and other publicly available data.
            </p>

            <p style={paragraphStyle}>
              This content is not intended to replace information supplied by
              governments, emergency services, financial institutions, medical
              professionals, environmental authorities, weather agencies, or
              other qualified and authoritative sources.
            </p>
          </section>

          <section aria-labelledby="third-party-data">
            <h2
              id="third-party-data"
              className="font-display"
              style={headingStyle}
            >
              2. Third-Party Data Sources
            </h2>

            <p style={paragraphStyle}>
              Some information displayed on Locafacts is obtained from
              third-party APIs, public databases, open datasets, mapping
              services, weather providers, currency services, geographic
              databases, and other external sources.
            </p>

            <p style={paragraphStyle}>
              Locafacts does not create or independently verify every item
              supplied by these providers. Third-party information may contain
              delays, omissions, inaccuracies, technical errors, outdated
              records, or differences between providers.
            </p>

            <p style={paragraphStyle}>
              The availability, format, accuracy, and update frequency of
              third-party data are controlled by the respective providers and
              may change without prior notice.
            </p>
          </section>

          <section aria-labelledby="emergency-information">
            <h2
              id="emergency-information"
              className="font-display"
              style={headingStyle}
            >
              3. Emergency Information
            </h2>

            <p style={paragraphStyle}>
              Locafacts is not an emergency service and does not provide
              emergency assistance, dispatch services, crisis intervention, or
              real-time emergency support.
            </p>

            <p style={paragraphStyle}>
              Emergency telephone numbers, service names, and contact details
              displayed on the website may change, vary by region, or be
              unavailable from some telephone networks.
            </p>

            <p style={paragraphStyle}>
              Do not rely exclusively on Locafacts during an emergency. Always
              verify emergency numbers through an official government,
              embassy, police, fire, medical, or civil-protection source.
            </p>

            <p style={paragraphStyle}>
              During an immediate emergency, contact the officially recognized
              emergency service for your current location using a reliable
              telephone or communication method.
            </p>
          </section>

          <section aria-labelledby="weather-information">
            <h2
              id="weather-information"
              className="font-display"
              style={headingStyle}
            >
              4. Weather Information
            </h2>

            <p style={paragraphStyle}>
              Weather information may be delayed, estimated, incomplete, or
              different from actual conditions at your precise location.
              Forecasts are predictions and are not guarantees of future
              conditions.
            </p>

            <p style={paragraphStyle}>
              Do not use Locafacts as the only source for severe-weather
              warnings, aviation, marine navigation, outdoor safety,
              evacuation, agriculture, travel planning, or other
              weather-sensitive decisions.
            </p>

            <p style={paragraphStyle}>
              For urgent or safety-critical information, consult your official
              national or local weather authority.
            </p>
          </section>

          <section aria-labelledby="air-quality-information">
            <h2
              id="air-quality-information"
              className="font-display"
              style={headingStyle}
            >
              5. Air-Quality Information
            </h2>

            <p style={paragraphStyle}>
              Air-quality values may be based on monitoring stations,
              estimates, models, averages, or third-party reporting systems.
              Conditions can vary significantly over short distances and time
              periods.
            </p>

            <p style={paragraphStyle}>
              Air-quality information on Locafacts is not medical advice and
              should not be used to diagnose, treat, prevent, or manage a
              medical condition.
            </p>

            <p style={paragraphStyle}>
              People with respiratory conditions, allergies, cardiovascular
              conditions, or other health concerns should consult an
              appropriate healthcare professional and follow guidance from
              official health or environmental authorities.
            </p>
          </section>

          <section aria-labelledby="currency-information">
            <h2
              id="currency-information"
              className="font-display"
              style={headingStyle}
            >
              6. Currency and Exchange-Rate Information
            </h2>

            <p style={paragraphStyle}>
              Currency exchange rates displayed on Locafacts are provided for
              general reference only. Rates may be delayed, rounded, estimated,
              or different from the rates offered by banks, payment providers,
              currency exchanges, card issuers, or financial institutions.
            </p>

            <p style={paragraphStyle}>
              Displayed conversions may not include commissions, transfer
              charges, taxes, service fees, card fees, spreads, or other
              transaction costs.
            </p>

            <p style={paragraphStyle}>
              Locafacts does not provide financial, investment, tax, banking,
              trading, or accounting advice. Verify the final rate and all
              applicable charges with your chosen financial provider before
              completing a transaction.
            </p>
          </section>

          <section aria-labelledby="location-information">
            <h2
              id="location-information"
              className="font-display"
              style={headingStyle}
            >
              7. Geographic and Location Information
            </h2>

            <p style={paragraphStyle}>
              Geographic names, coordinates, administrative regions,
              population figures, borders, capital cities, distances, time
              zones, and similar information may differ between data providers
              or change over time.
            </p>

            <p style={paragraphStyle}>
              Maps, coordinates, calculated distances, and location results
              should not be used as the sole basis for navigation, land
              ownership, legal boundaries, surveying, aviation, maritime
              activity, military operations, rescue operations, or other
              safety-critical purposes.
            </p>

            <p style={paragraphStyle}>
              Any boundaries, names, or geographic labels shown on Locafacts
              are presented for informational purposes and do not represent a
              political, legal, or diplomatic position.
            </p>
          </section>

          <section aria-labelledby="professional-advice">
            <h2
              id="professional-advice"
              className="font-display"
              style={headingStyle}
            >
              8. No Professional Advice
            </h2>

            <p style={paragraphStyle}>
              Nothing published on Locafacts constitutes medical, legal,
              financial, investment, tax, travel, immigration, security,
              emergency, environmental, engineering, or other professional
              advice.
            </p>

            <p style={paragraphStyle}>
              You should consult an appropriately qualified professional or
              official authority before making a decision that may affect your
              health, safety, finances, legal rights, travel plans, business,
              or property.
            </p>
          </section>

          <section aria-labelledby="accuracy">
            <h2
              id="accuracy"
              className="font-display"
              style={headingStyle}
            >
              9. Accuracy and Completeness
            </h2>

            <p style={paragraphStyle}>
              We make reasonable efforts to present useful information, but we
              make no representation or warranty that the website or its
              content is error-free, complete, current, suitable, or available
              for every purpose.
            </p>

            <p style={paragraphStyle}>
              Website content may be corrected, updated, removed, or changed at
              any time without prior notice. The absence of a correction does
              not mean that the information has been independently verified.
            </p>
          </section>

          <section aria-labelledby="calculations">
            <h2
              id="calculations"
              className="font-display"
              style={headingStyle}
            >
              10. Calculations and Generated Results
            </h2>

            <p style={paragraphStyle}>
              Any conversions, comparisons, summaries, estimates, rankings, or
              generated results provided by Locafacts depend on the available
              inputs, formulas, data sources, and assumptions.
            </p>

            <p style={paragraphStyle}>
              Rounding, missing information, outdated source data, software
              errors, or differences in measurement standards may affect the
              result. Verify important calculations through an independent and
              authoritative source.
            </p>
          </section>

          <section aria-labelledby="external-links">
            <h2
              id="external-links"
              className="font-display"
              style={headingStyle}
            >
              11. External Links
            </h2>

            <p style={paragraphStyle}>
              Locafacts may contain links to third-party websites, government
              resources, data providers, advertisers, or other external
              services.
            </p>

            <p style={paragraphStyle}>
              These links are provided for convenience or additional
              information. We do not control and are not responsible for the
              accuracy, availability, security, privacy practices, content, or
              services of external websites.
            </p>

            <p style={paragraphStyle}>
              The inclusion of an external link does not necessarily constitute
              an endorsement, partnership, sponsorship, or recommendation.
            </p>
          </section>

          <section aria-labelledby="advertising">
            <h2
              id="advertising"
              className="font-display"
              style={headingStyle}
            >
              12. Advertising Disclaimer
            </h2>

            <p style={paragraphStyle}>
              Locafacts may display advertisements supplied by third-party
              advertising partners, including Google AdSense. Advertising helps
              support the operation and maintenance of the website.
            </p>

            <p style={paragraphStyle}>
              Advertisements are created and delivered by third parties. The
              appearance of an advertisement on Locafacts does not mean that we
              recommend, verify, guarantee, or endorse the advertiser, product,
              service, offer, or claim.
            </p>

            <p style={paragraphStyle}>
              Any communication, purchase, subscription, transaction, or
              dispute involving an advertiser is between you and that
              advertiser. Review the advertiser’s terms, policies, prices, and
              claims before taking action.
            </p>

            <p style={paragraphStyle}>
              Information about advertising cookies and related data practices
              is available in our{' '}
              <a href="/privacy-policy" style={linkStyle}>
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="availability">
            <h2
              id="availability"
              className="font-display"
              style={headingStyle}
            >
              13. Website Availability
            </h2>

            <p style={paragraphStyle}>
              We do not guarantee that Locafacts or any particular feature will
              always be available, uninterrupted, secure, or free from errors.
            </p>

            <p style={paragraphStyle}>
              The website may become temporarily or permanently unavailable
              because of maintenance, technical problems, security incidents,
              hosting interruptions, third-party API failures, service changes,
              or circumstances outside our control.
            </p>
          </section>

          <section aria-labelledby="user-responsibility">
            <h2
              id="user-responsibility"
              className="font-display"
              style={headingStyle}
            >
              14. Your Responsibility
            </h2>

            <p style={paragraphStyle}>
              You are responsible for evaluating whether the information on
              Locafacts is appropriate for your intended purpose.
            </p>

            <p style={paragraphStyle}>
              Before making an important decision, you should compare the
              information with official, current, and authoritative sources.
              Any action you take based on website content is undertaken at
              your own discretion and risk.
            </p>
          </section>

          <section aria-labelledby="limitation-liability">
            <h2
              id="limitation-liability"
              className="font-display"
              style={headingStyle}
            >
              15. Limitation of Liability
            </h2>

            <p style={paragraphStyle}>
              To the fullest extent permitted by applicable law, Locafacts and
              its owner will not be liable for any loss, damage, cost, injury,
              delay, inconvenience, or other consequence arising from:
            </p>

            <ul style={listStyle}>
              <li style={{ marginBottom: '10px' }}>
                Your use of or inability to use the website
              </li>

              <li style={{ marginBottom: '10px' }}>
                Reliance on information displayed on the website
              </li>

              <li style={{ marginBottom: '10px' }}>
                Inaccurate, incomplete, delayed, or unavailable data
              </li>

              <li style={{ marginBottom: '10px' }}>
                Third-party APIs, services, advertisements, or external links
              </li>

              <li style={{ marginBottom: '10px' }}>
                Technical errors, interruptions, or security incidents
              </li>

              <li>
                Decisions or actions taken using website information
              </li>
            </ul>

            <p style={paragraphStyle}>
              Nothing in this disclaimer excludes or limits any liability that
              cannot lawfully be excluded or limited.
            </p>
          </section>

          <section aria-labelledby="other-policies">
            <h2
              id="other-policies"
              className="font-display"
              style={headingStyle}
            >
              16. Other Website Policies
            </h2>

            <p style={paragraphStyle}>
              Your use of Locafacts is also subject to our{' '}
              <a href="/terms" style={linkStyle}>
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="/privacy-policy" style={linkStyle}>
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="changes">
            <h2
              id="changes"
              className="font-display"
              style={headingStyle}
            >
              17. Changes to This Disclaimer
            </h2>

            <p style={paragraphStyle}>
              We may update this disclaimer when the website, its features,
              data providers, advertising arrangements, or applicable
              requirements change.
            </p>

            <p style={paragraphStyle}>
              Updates will be published on this page with a revised “Last
              updated” date. Continued use of Locafacts after an update means
              that you acknowledge the revised disclaimer.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2
              id="contact"
              className="font-display"
              style={headingStyle}
            >
              18. Contact Us
            </h2>

            <p style={paragraphStyle}>
              To report inaccurate information or ask a question about this
              disclaimer, contact:
            </p>

            <address
              style={{
                ...paragraphStyle,
                fontStyle: 'normal',
                padding: '20px',
                border: '1px solid var(--border, #dddddd)',
                borderRadius: '8px',
              }}
            >
              <strong>Website:</strong> Locafacts
              <br />

              <strong>Email:</strong>{' '}
              <a href="mailto:support@locafacts.com" style={linkStyle}>
                support@locafacts.com
              </a>
              <br />

              <strong>Website address:</strong>{' '}
              <a
                href="https://locafacts.com"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                locafacts.com
              </a>
            </address>
          </section>
        </article>
      </main>
    </>
  );
}