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

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Locafacts</title>

        <meta
          name="description"
          content="Read the Locafacts Privacy Policy to understand how we use cookies, advertising technologies, analytics, location-related data, and third-party services."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://locafacts.com/privacy-policy"
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
              Privacy Policy
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
            Locafacts respects your privacy. This Privacy Policy explains what
            information may be collected when you visit locafacts.com, how that
            information may be used, and the choices available to you.
          </p>

          <p style={paragraphStyle}>
            In this policy, “Locafacts,” “we,” “us,” and “our” refer to the
            Locafacts website and its owner, Mizanur Rahaman.
          </p>

          <p style={paragraphStyle}>
            By using Locafacts, you acknowledge the practices described in this
            Privacy Policy. Where consent is required by law, we will request
            consent before using non-essential cookies or processing
            information for certain advertising purposes.
          </p>

          <section aria-labelledby="information-collected">
            <h2
              id="information-collected"
              className="font-display"
              style={headingStyle}
            >
              1. Information We May Collect
            </h2>

            <p style={paragraphStyle}>
              The information collected through Locafacts depends on how you
              use the website. It may include the following categories.
            </p>

            <h3
              className="font-display"
              style={{
                fontSize: '18px',
                marginTop: '24px',
                marginBottom: '10px',
              }}
            >
              Information collected automatically
            </h3>

            <p style={paragraphStyle}>
              When you visit the website, our hosting provider, analytics
              services, advertising partners, and other service providers may
              automatically receive technical and usage information, such as:
            </p>

            <ul style={listStyle}>
              <li style={{ marginBottom: '10px' }}>
                Your Internet Protocol address
              </li>

              <li style={{ marginBottom: '10px' }}>
                Browser type, operating system, and device type
              </li>

              <li style={{ marginBottom: '10px' }}>
                Referring pages and pages viewed on Locafacts
              </li>

              <li style={{ marginBottom: '10px' }}>
                Approximate geographic region derived from your IP address
              </li>

              <li style={{ marginBottom: '10px' }}>
                Date, time, session duration, and interaction information
              </li>

              <li>
                Cookie identifiers and similar online identifiers
              </li>
            </ul>

            <h3
              className="font-display"
              style={{
                fontSize: '18px',
                marginTop: '24px',
                marginBottom: '10px',
              }}
            >
              Information you provide voluntarily
            </h3>

            <p style={paragraphStyle}>
              If you contact us by email, we may receive your name, email
              address, message, attachments, and any other information you
              choose to provide.
            </p>

            <p style={paragraphStyle}>
              Please do not send sensitive personal information unless it is
              necessary for us to respond to your request.
            </p>
          </section>

          <section aria-labelledby="location-information">
            <h2
              id="location-information"
              className="font-display"
              style={headingStyle}
            >
              2. Location Information
            </h2>

            <p style={paragraphStyle}>
              Locafacts provides location-related information. When you search
              for, enter, or select a place, the location query may be processed
              by Locafacts and the relevant third-party data provider to return
              the requested results.
            </p>

            <p style={paragraphStyle}>
              Some website features may offer the option to use your device
              location. Locafacts will not receive browser-provided precise
              location information unless you grant permission through your
              browser or device.
            </p>

            <p style={paragraphStyle}>
              You can deny or withdraw location permission at any time through
              your browser or device settings. Some location-based features may
              not work correctly after permission is denied.
            </p>
          </section>

          <section aria-labelledby="how-information-used">
            <h2
              id="how-information-used"
              className="font-display"
              style={headingStyle}
            >
              3. How We Use Information
            </h2>

            <p style={paragraphStyle}>
              We may use collected information for purposes including:
            </p>

            <ul style={listStyle}>
              <li style={{ marginBottom: '10px' }}>
                Operating, maintaining, and improving Locafacts
              </li>

              <li style={{ marginBottom: '10px' }}>
                Providing location-related information and requested features
              </li>

              <li style={{ marginBottom: '10px' }}>
                Understanding website traffic and feature usage
              </li>

              <li style={{ marginBottom: '10px' }}>
                Detecting fraud, abuse, security incidents, and technical
                problems
              </li>

              <li style={{ marginBottom: '10px' }}>
                Displaying, measuring, and managing advertisements
              </li>

              <li style={{ marginBottom: '10px' }}>
                Responding to questions, feedback, or support requests
              </li>

              <li>
                Complying with legal obligations and enforcing our policies
              </li>
            </ul>
          </section>

          <section aria-labelledby="cookies">
            <h2
              id="cookies"
              className="font-display"
              style={headingStyle}
            >
              4. Cookies and Similar Technologies
            </h2>

            <p style={paragraphStyle}>
              Cookies are small data files stored on your browser or device.
              Locafacts and its service providers may use cookies, web beacons,
              pixels, local storage, IP addresses, and similar technologies.
            </p>

            <p style={paragraphStyle}>
              These technologies may be used to:
            </p>

            <ul style={listStyle}>
              <li style={{ marginBottom: '10px' }}>
                Keep the website secure and functioning correctly
              </li>

              <li style={{ marginBottom: '10px' }}>
                Remember privacy or consent preferences
              </li>

              <li style={{ marginBottom: '10px' }}>
                Understand website traffic and performance
              </li>

              <li style={{ marginBottom: '10px' }}>
                Prevent fraudulent advertising activity
              </li>

              <li>
                Deliver, personalize, limit, and measure advertisements
              </li>
            </ul>

            <p style={paragraphStyle}>
              Cookies may be first-party cookies associated with Locafacts or
              third-party cookies associated with external service providers.
            </p>

            <p style={paragraphStyle}>
              You can manage or delete cookies through your browser settings.
              Blocking all cookies may affect website functionality, privacy
              preference storage, analytics, and advertising.
            </p>
          </section>

          <section aria-labelledby="google-adsense">
            <h2
              id="google-adsense"
              className="font-display"
              style={headingStyle}
            >
              5. Google AdSense and Advertising
            </h2>

            <p style={paragraphStyle}>
              Locafacts uses or may use Google AdSense to display
              advertisements. Google and other third-party advertising vendors
              may place and read cookies on your browser or use web beacons, IP
              addresses, and similar technologies as a result of advertisements
              being served on this website.
            </p>

            <p style={paragraphStyle}>
              Third-party vendors, including Google, may use cookies to serve
              advertisements based on your previous visits to Locafacts or
              other websites.
            </p>

            <p style={paragraphStyle}>
              Google’s use of advertising cookies enables Google and its
              partners to serve personalized or non-personalized advertisements,
              depending on your location, consent choices, browser settings,
              account settings, and applicable law.
            </p>

            <p style={paragraphStyle}>
              Advertising information may include your IP address, browser
              type, device information, ad interactions, cookie identifiers,
              approximate location, and information about visits to this and
              other websites.
            </p>

            <p style={paragraphStyle}>
              You can learn how Google uses information from websites that use
              its services by visiting{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                How Google uses information from sites or apps that use its
                services
              </a>
              .
            </p>

            <p style={paragraphStyle}>
              You can manage ad-personalization settings through{' '}
              <a
                href="https://myadcenter.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                Google My Ad Center
              </a>
              .
            </p>

            <p style={paragraphStyle}>
              Turning off personalized advertising does not necessarily remove
              all advertisements. You may continue to see contextual or
              non-personalized advertisements based on factors such as the
              current page, your general location, or your browser type.
            </p>
          </section>

          <section aria-labelledby="consent-management">
            <h2
              id="consent-management"
              className="font-display"
              style={headingStyle}
            >
              6. Consent Management
            </h2>

            <p style={paragraphStyle}>
              Where required by applicable law, Locafacts uses or will use a
              consent-management platform to request and record choices about
              cookies, advertising personalization, analytics, and related data
              processing.
            </p>

            <p style={paragraphStyle}>
              Visitors in the European Economic Area, the United Kingdom,
              Switzerland, and other applicable regions may be shown a consent
              message before certain advertising or analytics technologies are
              activated.
            </p>

            <p style={paragraphStyle}>
              You may withdraw or change your consent through the privacy or
              cookie controls displayed on the website. Withdrawing consent
              does not affect processing that occurred before consent was
              withdrawn.
            </p>
          </section>

          <section aria-labelledby="analytics">
            <h2
              id="analytics"
              className="font-display"
              style={headingStyle}
            >
              7. Analytics and Performance Measurement
            </h2>

            <p style={paragraphStyle}>
              Locafacts may use analytics services to understand how visitors
              find and use the website. These services may collect information
              such as page views, visit duration, referring pages, device type,
              browser information, approximate location, and website
              interactions.
            </p>

            <p style={paragraphStyle}>
              Analytics information is used to identify technical issues,
              measure performance, understand popular content, and improve the
              user experience.
            </p>

            <p style={paragraphStyle}>
              Where legally required, non-essential analytics technologies will
              be used only after the appropriate consent has been obtained.
            </p>
          </section>

          <section aria-labelledby="third-parties">
            <h2
              id="third-parties"
              className="font-display"
              style={headingStyle}
            >
              8. Third-Party Services and Data Providers
            </h2>

            <p style={paragraphStyle}>
              Locafacts may use third-party hosting, advertising, analytics,
              security, mapping, weather, currency, air-quality, country-data,
              geocoding, and other API services.
            </p>

            <p style={paragraphStyle}>
              When your browser connects to a third-party service, that provider
              may receive technical information such as your IP address,
              browser details, requested URL, approximate location, and the
              date and time of the request.
            </p>

            <p style={paragraphStyle}>
              Third-party providers process information according to their own
              privacy policies and terms. Locafacts does not control the data
              practices of independent third parties.
            </p>

            <p style={paragraphStyle}>
              Location facts and other information supplied by third-party APIs
              are provided for informational purposes. Please review our{' '}
              <a href="/terms" style={linkStyle}>
                Terms and Conditions
              </a>{' '}
              for information about third-party data accuracy and permitted
              use.
            </p>
          </section>

          <section aria-labelledby="sharing-information">
            <h2
              id="sharing-information"
              className="font-display"
              style={headingStyle}
            >
              9. How Information May Be Shared
            </h2>

            <p style={paragraphStyle}>
              We may share or allow access to information in the following
              circumstances:
            </p>

            <ul style={listStyle}>
              <li style={{ marginBottom: '10px' }}>
                With hosting, analytics, advertising, API, security, and
                technical service providers
              </li>

              <li style={{ marginBottom: '10px' }}>
                When necessary to provide a feature or respond to your request
              </li>

              <li style={{ marginBottom: '10px' }}>
                When required by law, regulation, court order, or lawful
                government request
              </li>

              <li style={{ marginBottom: '10px' }}>
                To investigate fraud, security threats, misuse, or violations
                of our terms
              </li>

              <li>
                In connection with a website sale, transfer, restructuring, or
                change of ownership
              </li>
            </ul>

            <p style={paragraphStyle}>
              We do not sell personal information for direct monetary payment.
              However, certain advertising or analytics activities may be
              considered a “sale,” “sharing,” or “targeted advertising” under
              some regional privacy laws.
            </p>
          </section>

          <section aria-labelledby="legal-bases">
            <h2
              id="legal-bases"
              className="font-display"
              style={headingStyle}
            >
              10. Legal Bases for Processing
            </h2>

            <p style={paragraphStyle}>
              Where privacy law requires a legal basis, information may be
              processed on one or more of the following bases:
            </p>

            <ul style={listStyle}>
              <li style={{ marginBottom: '10px' }}>
                Your consent
              </li>

              <li style={{ marginBottom: '10px' }}>
                Our legitimate interests in operating, securing, analyzing, and
                improving the website
              </li>

              <li style={{ marginBottom: '10px' }}>
                Performance of a service you request
              </li>

              <li>
                Compliance with legal obligations
              </li>
            </ul>
          </section>

          <section aria-labelledby="privacy-rights">
            <h2
              id="privacy-rights"
              className="font-display"
              style={headingStyle}
            >
              11. Your Privacy Rights
            </h2>

            <p style={paragraphStyle}>
              Depending on where you live, you may have rights concerning your
              personal information, including the right to:
            </p>

            <ul style={listStyle}>
              <li style={{ marginBottom: '10px' }}>
                Request access to personal information
              </li>

              <li style={{ marginBottom: '10px' }}>
                Request correction or deletion
              </li>

              <li style={{ marginBottom: '10px' }}>
                Object to or restrict certain processing
              </li>

              <li style={{ marginBottom: '10px' }}>
                Withdraw consent
              </li>

              <li style={{ marginBottom: '10px' }}>
                Request a portable copy of certain information
              </li>

              <li style={{ marginBottom: '10px' }}>
                Opt out of targeted advertising or certain forms of data
                sharing
              </li>

              <li>
                Submit a complaint to an applicable privacy regulator
              </li>
            </ul>

            <p style={paragraphStyle}>
              To submit a privacy request, email{' '}
              <a href="mailto:support@locafacts.com" style={linkStyle}>
                support@locafacts.com
              </a>
              . We may need to verify your request before responding.
            </p>

            <p style={paragraphStyle}>
              Some information is processed directly by independent third
              parties, such as Google. Requests concerning that information may
              need to be submitted directly to the relevant provider.
            </p>
          </section>

          <section aria-labelledby="retention">
            <h2
              id="retention"
              className="font-display"
              style={headingStyle}
            >
              12. Data Retention
            </h2>

            <p style={paragraphStyle}>
              We retain information only for as long as reasonably necessary
              for the purposes described in this policy, including maintaining
              website security, responding to correspondence, resolving
              disputes, and meeting legal obligations.
            </p>

            <p style={paragraphStyle}>
              Third-party providers determine their own retention periods under
              their respective policies.
            </p>
          </section>

          <section aria-labelledby="security">
            <h2
              id="security"
              className="font-display"
              style={headingStyle}
            >
              13. Data Security
            </h2>

            <p style={paragraphStyle}>
              We use reasonable administrative and technical measures designed
              to protect information from unauthorized access, loss, misuse, or
              alteration.
            </p>

            <p style={paragraphStyle}>
              No website, transmission method, or storage system is completely
              secure. We therefore cannot guarantee absolute security.
            </p>
          </section>

          <section aria-labelledby="international-transfers">
            <h2
              id="international-transfers"
              className="font-display"
              style={headingStyle}
            >
              14. International Data Transfers
            </h2>

            <p style={paragraphStyle}>
              Locafacts and its service providers may process information in
              countries other than the country where you live. Those countries
              may have different privacy and data-protection laws.
            </p>

            <p style={paragraphStyle}>
              Where required, appropriate measures may be used to protect
              information transferred internationally.
            </p>
          </section>

          <section aria-labelledby="external-links">
            <h2
              id="external-links"
              className="font-display"
              style={headingStyle}
            >
              15. External Links
            </h2>

            <p style={paragraphStyle}>
              Locafacts may link to third-party websites and resources. We are
              not responsible for the privacy, security, or content practices
              of external websites.
            </p>

            <p style={paragraphStyle}>
              You should review the privacy policy of any external website
              before providing personal information.
            </p>
          </section>

          <section aria-labelledby="children">
            <h2
              id="children"
              className="font-display"
              style={headingStyle}
            >
              16. Children’s Privacy
            </h2>

            <p style={paragraphStyle}>
              Locafacts is intended for a general audience and is not directed
              specifically to children under the age of 13.
            </p>

            <p style={paragraphStyle}>
              We do not knowingly request personal information from children
              under 13. If you believe a child has provided personal
              information to Locafacts, contact us so we can review and, where
              appropriate, delete it.
            </p>
          </section>

          <section aria-labelledby="do-not-track">
            <h2
              id="do-not-track"
              className="font-display"
              style={headingStyle}
            >
              17. Do Not Track Signals
            </h2>

            <p style={paragraphStyle}>
              Some browsers provide a “Do Not Track” setting. Because there is
              no universally accepted standard for responding to every Do Not
              Track signal, Locafacts may not respond to all such signals.
            </p>

            <p style={paragraphStyle}>
              You can use browser settings, Google My Ad Center, and the
              website’s available consent controls to manage certain data and
              advertising preferences.
            </p>
          </section>

          <section aria-labelledby="policy-changes">
            <h2
              id="policy-changes"
              className="font-display"
              style={headingStyle}
            >
              18. Changes to This Privacy Policy
            </h2>

            <p style={paragraphStyle}>
              We may update this Privacy Policy when our website features,
              advertising arrangements, data providers, service providers, or
              legal obligations change.
            </p>

            <p style={paragraphStyle}>
              Updates will be published on this page, and the “Last updated”
              date will be revised. We encourage you to review this policy
              periodically.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2
              id="contact"
              className="font-display"
              style={headingStyle}
            >
              19. Contact Us
            </h2>

            <p style={paragraphStyle}>
              For questions, concerns, or privacy requests relating to this
              policy, contact:
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

              <strong>Website owner:</strong> YOUR FULL NAME
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