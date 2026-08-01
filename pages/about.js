import Head from 'next/head';

const paragraphStyle = {
  color: 'var(--text-muted)',
  fontSize: '16px',
  lineHeight: '1.8',
  marginBottom: '16px',
};

const headingStyle = {
  fontSize: '24px',
  lineHeight: '1.35',
  marginTop: '42px',
  marginBottom: '14px',
};

const linkStyle = {
  color: 'var(--accent, #1F7A6C)',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
};

const featureItems = [
  {
    title: 'Weather Information',
    description:
      'Current conditions and forecasts supplied by third-party weather data services.',
  },
  {
    title: 'Currency Information',
    description:
      'Reference exchange rates and currency details for countries and destinations.',
  },
  {
    title: 'Air-Quality Data',
    description:
      'Available air-quality readings and related environmental information.',
  },
  {
    title: 'Country and City Facts',
    description:
      'Useful geographic, cultural, administrative, time-zone, and local reference information.',
  },
  {
    title: 'Emergency Information',
    description:
      'Common emergency contact details presented as a reference and subject to independent verification.',
  },
  {
    title: 'Location Tools',
    description:
      'Practical tools and organized information designed to make location research easier.',
  },
];

const principles = [
  {
    title: 'Clarity',
    description:
      'We organize complex location information into pages that are easy to scan and understand.',
  },
  {
    title: 'Transparency',
    description:
      'We clearly explain that much of the data comes from independent public APIs and external providers.',
  },
  {
    title: 'Practical Value',
    description:
      'We focus on information people may genuinely need when researching, travelling, studying, or communicating internationally.',
  },
  {
    title: 'Responsible Publishing',
    description:
      'We distinguish general information from professional, financial, medical, navigational, or emergency advice.',
  },
];

export default function About() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Locafacts',
    description:
      'Learn about Locafacts, an independent location-information website covering weather, currencies, air quality, city information, and country facts.',
    url: 'https://locafacts.com/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'Locafacts',
      url: 'https://locafacts.com',
      email: 'support@locafacts.com',
      description:
        'An independent information platform that organizes useful location-based data and facts.',
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Locafacts',
      url: 'https://locafacts.com',
    },
  };

  return (
    <>
      <Head>
        <title>About Locafacts | Location Data and Global Facts</title>

        <meta
          name="description"
          content="Learn how Locafacts organizes weather, currency, air quality, city information, emergency references, and essential country facts."
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://locafacts.com/about" />

        <meta
          property="og:title"
          content="About Locafacts | Location Data and Global Facts"
        />

        <meta
          property="og:description"
          content="Discover the mission, data approach, editorial principles, and purpose behind Locafacts."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locafacts.com/about" />
        <meta property="og:site_name" content="Locafacts" />

        <meta name="twitter:card" content="summary" />

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
          <header className="hero">
            <p className="eyebrow">About Locafacts</p>

            <h1 className="font-display">
              Useful location information, brought together in one place
            </h1>

            <p className="hero-description">
              Locafacts is an independent information platform that helps
              people explore useful facts and frequently requested data about
              cities, countries, and locations around the world.
            </p>
          </header>

          <section aria-labelledby="our-purpose">
            <h2
              id="our-purpose"
              className="font-display"
              style={{
                ...headingStyle,
                marginTop: '0',
              }}
            >
              Our Purpose
            </h2>

            <p style={paragraphStyle}>
              Finding basic information about a location often requires
              visiting several different websites. A visitor may need one
              service for weather, another for currency exchange rates, a
              separate source for air quality, and additional pages for time
              zones, emergency numbers, and country facts.
            </p>

            <p style={paragraphStyle}>
              Locafacts was created to simplify that process. Our goal is to
              organize practical location-related information into clear,
              accessible pages so visitors can find useful details without
              unnecessary complexity.
            </p>

            <p style={paragraphStyle}>
              The website is designed for travellers, students, researchers,
              remote workers, international teams, curious readers, and anyone
              who needs a convenient overview of a place.
            </p>
          </section>

          <section aria-labelledby="what-we-provide">
            <h2
              id="what-we-provide"
              className="font-display"
              style={headingStyle}
            >
              What You Can Find on Locafacts
            </h2>

            <p style={paragraphStyle}>
              Depending on data availability, Locafacts may provide the
              following types of information:
            </p>

            <div className="feature-grid">
              {featureItems.map((item) => (
                <div className="feature-card" key={item.title}>
                  <h3 className="font-display">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>

            <p style={paragraphStyle}>
              Available information may differ between locations because not
              every data provider covers every city, country, or region.
            </p>
          </section>

          <section aria-labelledby="data-process">
            <h2
              id="data-process"
              className="font-display"
              style={headingStyle}
            >
              How Our Data Works
            </h2>

            <p style={paragraphStyle}>
              Locafacts obtains certain information from public datasets,
              geographic databases, open-data projects, and third-party
              application programming interfaces, commonly known as APIs.
            </p>

            <p style={paragraphStyle}>
              Some information may be refreshed automatically or periodically,
              depending on the update schedule, availability, and technical
              limitations of the original provider. Other content may be
              prepared or organized editorially to make the underlying
              information easier to understand.
            </p>

            <p style={paragraphStyle}>
              We aim to present information accurately and clearly, but
              third-party data can occasionally be delayed, incomplete,
              unavailable, or inconsistent across providers. Visitors should
              independently verify important information through an official or
              authoritative source.
            </p>

            <p style={paragraphStyle}>
              Additional limitations are explained in our{' '}
              <a href="/disclaimer" style={linkStyle}>
                Disclaimer
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="editorial-principles">
            <h2
              id="editorial-principles"
              className="font-display"
              style={headingStyle}
            >
              Our Publishing Principles
            </h2>

            <div className="principles-grid">
              {principles.map((principle) => (
                <div className="principle-item" key={principle.title}>
                  <h3 className="font-display">{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="accuracy-corrections">
            <h2
              id="accuracy-corrections"
              className="font-display"
              style={headingStyle}
            >
              Accuracy and Corrections
            </h2>

            <p style={paragraphStyle}>
              Location information can change. Administrative areas may be
              reorganized, exchange rates fluctuate, emergency services update
              contact numbers, weather conditions change quickly, and
              population figures are revised.
            </p>

            <p style={paragraphStyle}>
              We welcome reports about information that appears incorrect,
              outdated, incomplete, or unclear. Helpful correction requests
              should include the affected page, the disputed information, and
              an official or authoritative source supporting the correction.
            </p>

            <p style={paragraphStyle}>
              Corrections and data issues can be submitted through our{' '}
              <a href="/contact" style={linkStyle}>
                Contact page
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="independence">
            <h2
              id="independence"
              className="font-display"
              style={headingStyle}
            >
              Independent and Transparent
            </h2>

            <p style={paragraphStyle}>
              Locafacts is an independent website. It is not an official
              government service, emergency authority, tourism board,
              financial institution, medical provider, weather agency, or
              representative of any third-party data provider.
            </p>

            <p style={paragraphStyle}>
              The inclusion of a city, country, organization, service, data
              source, or external link does not imply an official partnership,
              endorsement, sponsorship, or affiliation.
            </p>

            <p style={paragraphStyle}>
              Geographic names, labels, and boundaries are displayed for
              general informational purposes and do not represent a legal,
              political, or diplomatic position.
            </p>
          </section>

          <section aria-labelledby="funding">
            <h2
              id="funding"
              className="font-display"
              style={headingStyle}
            >
              How Locafacts Is Supported
            </h2>

            <p style={paragraphStyle}>
              Locafacts is free to use. The website may display advertisements
              from third-party advertising partners, including Google AdSense,
              to help cover hosting, development, data-service, and maintenance
              costs.
            </p>

            <p style={paragraphStyle}>
              Advertising does not determine the factual information displayed
              on location pages. The appearance of an advertisement does not
              mean that Locafacts endorses or guarantees the advertiser,
              product, service, or claim.
            </p>

            <p style={paragraphStyle}>
              Information about advertising cookies and related data processing
              is available in our{' '}
              <a href="/privacy-policy" style={linkStyle}>
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="responsible-use">
            <h2
              id="responsible-use"
              className="font-display"
              style={headingStyle}
            >
              Responsible Use of Information
            </h2>

            <p style={paragraphStyle}>
              Locafacts is intended for general informational and educational
              use. It should not be treated as professional legal, medical,
              financial, navigational, environmental, security, or emergency
              advice.
            </p>

            <p style={paragraphStyle}>
              Weather forecasts, air-quality readings, currency conversions,
              geographic details, and emergency numbers should be confirmed
              through official sources before being used for important,
              time-sensitive, financial, health-related, or safety-critical
              decisions.
            </p>

            <p style={paragraphStyle}>
              Your use of Locafacts is also governed by our{' '}
              <a href="/terms" style={linkStyle}>
                Terms and Conditions
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="contact-locafacts">
            <h2
              id="contact-locafacts"
              className="font-display"
              style={headingStyle}
            >
              Contact Locafacts
            </h2>

            <p style={paragraphStyle}>
              We welcome constructive feedback, correction requests, location
              suggestions, technical reports, privacy questions, and general
              inquiries.
            </p>

            <div className="contact-box">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@locafacts.com" style={linkStyle}>
                  support@locafacts.com
                </a>
              </p>

              <p>
                <strong>Contact page:</strong>{' '}
                <a href="/contact" style={linkStyle}>
                  locafacts.com/contact
                </a>
              </p>
            </div>
          </section>
        </article>
      </main>

      <style jsx>{`
        .hero {
          padding: 38px;
          margin-bottom: 46px;
          border: 1px solid var(--border, #dddddd);
          border-radius: 16px;
          background: var(--surface, rgba(0, 0, 0, 0.02));
        }

        .eyebrow {
          color: var(--accent, #1f7a6c);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0 0 12px;
        }

        .hero h1 {
          max-width: 760px;
          font-size: 42px;
          line-height: 1.15;
          margin: 0 0 20px;
        }

        .hero-description {
          max-width: 720px;
          color: var(--text-muted);
          font-size: 18px;
          line-height: 1.75;
          margin: 0;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin: 24px 0 28px;
        }

        .feature-card {
          padding: 22px;
          border: 1px solid var(--border, #dddddd);
          border-radius: 12px;
          background: var(--surface, transparent);
        }

        .feature-card h3 {
          font-size: 18px;
          line-height: 1.4;
          margin: 0 0 9px;
        }

        .feature-card p {
          color: var(--text-muted);
          font-size: 15px;
          line-height: 1.7;
          margin: 0;
        }

        .principles-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-top: 22px;
        }

        .principle-item {
          padding-left: 18px;
          border-left: 3px solid var(--accent, #1f7a6c);
        }

        .principle-item h3 {
          font-size: 18px;
          margin: 0 0 8px;
        }

        .principle-item p {
          color: var(--text-muted);
          font-size: 15px;
          line-height: 1.7;
          margin: 0;
        }

        .contact-box {
          padding: 22px;
          margin-top: 20px;
          border: 1px solid var(--border, #dddddd);
          border-radius: 12px;
          background: var(--surface, rgba(0, 0, 0, 0.02));
        }

        .contact-box p {
          color: var(--text-muted);
          font-size: 16px;
          line-height: 1.7;
          margin: 0 0 8px;
        }

        .contact-box p:last-child {
          margin-bottom: 0;
        }

        a:focus-visible {
          outline: 3px solid rgba(31, 122, 108, 0.25);
          outline-offset: 3px;
          border-radius: 2px;
        }

        @media (max-width: 680px) {
          .hero {
            padding: 26px 22px;
          }

          .hero h1 {
            font-size: 34px;
          }

          .hero-description {
            font-size: 17px;
          }

          .feature-grid,
          .principles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}