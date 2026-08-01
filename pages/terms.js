import Head from 'next/head';

const textStyle = {
  color: 'var(--text-muted)',
  fontSize: '16px',
  lineHeight: '1.8',
  marginBottom: '16px',
};

const headingStyle = {
  fontSize: '22px',
  marginTop: '36px',
  marginBottom: '12px',
};

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Locafacts</title>

        <meta
          name="description"
          content="Read the terms and conditions governing your access to and use of Locafacts and its location-based information services."
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href="https://locafacts.com/terms"
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
              Terms and Conditions
            </h1>

            <p
              style={{
                ...textStyle,
                fontSize: '14px',
                marginBottom: '28px',
              }}
            >
              Last updated: July 31, 2026
            </p>
          </header>

          <p style={textStyle}>
            Welcome to Locafacts. These Terms and Conditions govern your
            access to and use of the Locafacts website, its pages, features,
            tools, and location-related information.
          </p>

          <p style={textStyle}>
            By accessing or using Locafacts, you confirm that you have read,
            understood, and agreed to these Terms and Conditions. If you do
            not agree with any part of these terms, you should stop using the
            website.
          </p>

          <section>
            <h2 className="font-display" style={headingStyle}>
              1. About Locafacts
            </h2>

            <p style={textStyle}>
              Locafacts is an informational website that helps users explore
              location-related facts, geographic information, and other
              publicly available data.
            </p>

            <p style={textStyle}>
              The website is operated by Mizanur Rahaman. References to
              “Locafacts,” “we,” “us,” or “our” throughout these terms refer
              to the website and its owner.
            </p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              2. Informational Purpose
            </h2>

            <p style={textStyle}>
              The information provided by Locafacts is intended for general
              informational and educational purposes only. It should not be
              treated as professional, legal, financial, medical, emergency,
              navigational, or safety advice.
            </p>

            <p style={textStyle}>
              You are responsible for independently verifying information
              before relying on it or using it to make an important decision.
            </p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              3. Location and Third-Party Data
            </h2>

            <p style={textStyle}>
              Locafacts may display information obtained from public records,
              open datasets, mapping services, geographic databases, and
              third-party application programming interfaces, also known as
              APIs.
            </p>

            <p style={textStyle}>
              Although we aim to present useful and accurate information, we
              do not guarantee that all data will always be accurate,
              complete, current, available, or suitable for a particular
              purpose.
            </p>

            <p style={textStyle}>
              Geographic names, boundaries, coordinates, population figures,
              distances, time zones, administrative areas, and other
              location-related details may change or differ between data
              providers.
            </p>

            <p style={textStyle}>
              Information displayed on Locafacts should not be used as the
              sole source for emergency response, travel safety, legal
              boundaries, navigation, property transactions, financial
              decisions, or other critical activities.
            </p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              4. Acceptable Use
            </h2>

            <p style={textStyle}>
              You may use Locafacts for lawful personal, educational, and
              informational purposes. You agree to use the website in a manner
              that does not interfere with its operation or the ability of
              other visitors to use it.
            </p>

            <p style={textStyle}>You must not:</p>

            <ul
              style={{
                ...textStyle,
                paddingLeft: '24px',
              }}
            >
              <li style={{ marginBottom: '10px' }}>
                Use the website for unlawful, fraudulent, or harmful
                activities.
              </li>

              <li style={{ marginBottom: '10px' }}>
                Attempt to gain unauthorized access to the website, server,
                database, or related systems.
              </li>

              <li style={{ marginBottom: '10px' }}>
                Introduce viruses, malicious software, automated attacks, or
                other harmful technology.
              </li>

              <li style={{ marginBottom: '10px' }}>
                Scrape, copy, harvest, or systematically extract website
                content in a way that places an unreasonable load on our
                systems or violates applicable laws.
              </li>

              <li style={{ marginBottom: '10px' }}>
                Misrepresent Locafacts content as official government,
                emergency, legal, or professional guidance.
              </li>

              <li>
                Use the website in a way that violates the rights of another
                person, organization, service provider, or data owner.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              5. Intellectual Property
            </h2>

            <p style={textStyle}>
              Unless otherwise stated, the original website design, branding,
              written explanations, page layouts, graphics, and other original
              content published on Locafacts are owned by or licensed to
              Locafacts and are protected by applicable intellectual property
              laws.
            </p>

            <p style={textStyle}>
              Data, maps, trademarks, logos, and other materials supplied by
              third-party services remain the property of their respective
              owners and may be subject to separate licenses or terms.
            </p>

            <p style={textStyle}>
              You may view and use our content for personal and
              non-commercial informational purposes. You may not reproduce,
              republish, sell, redistribute, or commercially exploit original
              Locafacts content without prior written permission, except where
              permitted by law.
            </p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              6. Advertising
            </h2>

            <p style={textStyle}>
              Locafacts may display advertisements provided by third-party
              advertising partners, including Google AdSense. Advertising
              helps support the operation and maintenance of the website.
            </p>

            <p style={textStyle}>
              Advertisements are supplied and controlled by third-party
              providers. The appearance of an advertisement does not
              necessarily mean that Locafacts recommends, guarantees, or
              endorses the advertised product, service, company, or claim.
            </p>

            <p style={textStyle}>
              Your interactions with advertisers are between you and the
              advertiser. You should review the advertiser’s terms and privacy
              practices before making a purchase or providing personal
              information.
            </p>

            <p style={textStyle}>
  Additional information about advertising technologies, cookies, and data
  processing is available in our{' '}
  <a href="/privacy-policy">Privacy Policy</a>.
</p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              7. External Links
            </h2>

            <p style={textStyle}>
              Locafacts may contain links to third-party websites, services,
              maps, data providers, or other external resources. These links
              are provided for convenience and additional information.
            </p>

            <p style={textStyle}>
              We do not control external websites and are not responsible for
              their content, availability, security, accuracy, terms,
              advertising, or privacy practices. Visiting a third-party
              website is done at your own discretion and risk.
            </p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              8. No Warranties
            </h2>

            <p style={textStyle}>
              Locafacts and all information available through it are provided
              on an “as is” and “as available” basis.
            </p>

            <p style={textStyle}>
              To the fullest extent permitted by applicable law, we make no
              warranties or representations, express or implied, regarding
              the accuracy, reliability, completeness, availability,
              security, merchantability, fitness for a particular purpose, or
              non-infringement of the website or its content.
            </p>

            <p style={textStyle}>
              We do not guarantee that the website will always operate without
              interruption, delay, technical problems, data errors, or
              security vulnerabilities.
            </p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              9. Limitation of Liability
            </h2>

            <p style={textStyle}>
              To the fullest extent permitted by applicable law, Locafacts and
              its owner will not be liable for any direct, indirect,
              incidental, special, consequential, or other loss arising from
              your access to, use of, or reliance on the website or its
              information.
            </p>

            <p style={textStyle}>
              This includes, without limitation, losses caused by inaccurate
              data, unavailable services, outdated information, third-party
              content, external links, technical interruptions, or decisions
              made using information displayed on Locafacts.
            </p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              10. Website Availability
            </h2>

            <p style={textStyle}>
              We may modify, suspend, restrict, or discontinue any part of
              Locafacts at any time. We may also change data sources,
              features, page structures, or service providers without prior
              notice.
            </p>

            <p style={textStyle}>
              We are not responsible for any loss resulting from temporary or
              permanent website unavailability.
            </p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              11. Privacy and Cookies
            </h2>

           <p style={textStyle}>
  Your use of Locafacts is also governed by our{' '}
  <a href="/privacy-policy">Privacy Policy</a>, which explains how information
  may be collected, used, stored, and processed.
</p>

            <p style={textStyle}>
              Where required, Locafacts may request consent before using
              certain cookies or advertising technologies. You may be able to
              manage your choices through the cookie or privacy controls
              provided on the website.
            </p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              12. Changes to These Terms
            </h2>

            <p style={textStyle}>
              We may update these Terms and Conditions when our services,
              business practices, data providers, advertising arrangements,
              or legal obligations change.
            </p>

            <p style={textStyle}>
              The revised version will be published on this page with an
              updated revision date. Your continued use of Locafacts after an
              update means that you accept the revised terms.
            </p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              13. Severability
            </h2>

            <p style={textStyle}>
              If any provision of these Terms and Conditions is found to be
              invalid, unlawful, or unenforceable, the remaining provisions
              will continue to apply to the fullest extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              14. Governing Law
            </h2>

            <p style={textStyle}>
              These Terms and Conditions are governed by the applicable laws
              of Bangladesh, without regard to conflict-of-law
              principles.
            </p>

            <p style={textStyle}>
              Any dispute relating to these terms or the use of Locafacts will
              be handled by the courts or authorities having jurisdiction
              under applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-display" style={headingStyle}>
              15. Contact Us
            </h2>

            <p style={textStyle}>
              For questions, concerns, permission requests, or notices
              regarding these Terms and Conditions, contact:
            </p>

            <address
              style={{
                ...textStyle,
                fontStyle: 'normal',
                padding: '20px',
                border: '1px solid var(--border, #ddd)',
                borderRadius: '8px',
              }}
            >
              <strong>Website owner:</strong> Mizanur Rahaman
              <br />
              <strong>Website:</strong> Locafacts
              <br />
              <strong>Email:</strong>{' '}
              <a href="mailto:support@locafacts.com">
                support@locafacts.com
              </a>
            </address>
          </section>
        </article>
      </main>
    </>
  );
}