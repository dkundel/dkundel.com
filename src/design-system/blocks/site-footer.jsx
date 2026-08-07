import { GitHubIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from '../../icons/Socialicons';

const socialChannels = {
  github: { name: 'GitHub', icon: GitHubIcon },
  linkedin: { name: 'LinkedIn', icon: LinkedInIcon },
  twitter: { name: 'X', icon: TwitterIcon },
  instagram: { name: 'Instagram', icon: InstagramIcon },
};

export function SiteFooter({ image, socials = {} }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-signature">
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt="Panda emoji sitting in front of laptop"
          loading="lazy"
          decoding="async"
        />
          <p>
            Designed and built by{' '}
            <a href="https://github.com/dkundel/dkundel.com" target="_blank" rel="noopener noreferrer">
              Dominik Kundel
            </a>
          </p>
        </div>
        <ul className="social-links" aria-label="Social profiles">
          {Object.entries(socials).map(([channel, href]) => {
            const socialChannel = socialChannels[channel];
            if (!socialChannel) return null;
            const Icon = socialChannel.icon;
            return (
              <li key={channel}>
                <a
                  className="social-link"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socialChannel.name}
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
