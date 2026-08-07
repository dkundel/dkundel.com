import headshotImage from '../../images/me-decorative.png';

export function HomeIntro() {
  return (
    <section className="hero" aria-labelledby="home-title">
      <div className="hero__copy">
        <p className="eyebrow">OpenAI · Developer Experience</p>
        <h1 id="home-title" className="display-title">
          I make complex technology feel obvious.
        </h1>
        <p className="hero__lead">
          Developer, product leader, and speaker working at the intersection of
          AI, developer tools, and the people who build with them.
        </p>
        <div className="hero__actions">
          <a className="button-link button-link--primary" href="/work">
            Selected work <span aria-hidden="true">↗</span>
          </a>
          <a className="button-link" href="mailto:hi@dkundel.com">
            Get in touch
          </a>
        </div>
      </div>
      <div className="portrait">
        <img
          src={headshotImage.src}
          width={headshotImage.width}
          height={headshotImage.height}
          alt="Dominik Kundel"
          decoding="async"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
