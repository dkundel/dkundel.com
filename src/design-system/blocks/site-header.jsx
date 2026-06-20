import { GitHubIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from '../../icons/Socialicons';
import { cn } from '../lib/utils.js';

const socialChannels = {
  github: {
    name: 'GitHub',
    icon: GitHubIcon,
  },
  linkedin: {
    name: 'LinkedIn',
    icon: LinkedInIcon,
  },
  instagram: {
    name: 'Instagram',
    icon: InstagramIcon,
  },
  twitter: {
    name: 'Twitter',
    icon: TwitterIcon,
  },
};

function normalizePath(path) {
  return path === '/' ? path : (path.endsWith('/') ? path.slice(0, -1) : path);
}

function navLinkClass(isActive) {
  return cn(
    'border-b-2 text-black/80 dark:text-gray-400 box-border no-underline border-solid border-secondaryGreen-500 hover:border-secondaryGreen-500 focus:border-secondaryGreen-500 focus:no-underline hover:no-underline',
    isActive ? 'dark:text-white font-bold' : 'border-transparent'
  );
}

export function SiteHeader({ name, path = '/', socials, children }) {
  const normalizedPath = normalizePath(path);

  return (
    <div className="flex flex-wrap justify-between p-[20px] w-full min-h-fit max-w-[1000px] flex-col md:flex-row">
      <hgroup className="page-title-container items-center">
        <h2 className="m-0 p-0 min-w-[226px] shrink-0 large-headings tracking-wider text-base leading-snug dark:text-white">
          {name}
        </h2>
      </hgroup>
      <div className="flex items-center gap-10">
        <nav className="navigation-container leading-8">
          <a href="/" className={navLinkClass(normalizedPath === '/')}>About Me</a>
          <a href="/writing" className={navLinkClass(normalizedPath === '/writing')}>Writing</a>
          <a href="/blog" className={navLinkClass(normalizedPath === '/blog')}>Blog</a>
          <a href="/speaking" className={navLinkClass(normalizedPath === '/speaking')}>Speaking</a>
        </nav>
        <SocialLinks socials={socials}>{children}</SocialLinks>
      </div>
    </div>
  );
}

export function SocialLinks({ socials = {}, children }) {
  return (
    <div className="flex flex-col -mt-[36px] sm:mt-0 sm:flex-row gap-1 sm:gap-3">
      {Object.entries(socials).map(([channel, href]) => {
        const socialChannel = socialChannels[channel];
        if (!socialChannel) {
          return null;
        }

        const Icon = socialChannel.icon;
        return (
          <a key={channel} href={href} target="_blank" rel="noopener noreferrer">
            <Icon
              className="h-5 w-5 dark:fill-gray-400 dark:hover:fill-gray-100 hover:fill-secondaryGreen-500"
              aria-label={`${socialChannel.name} Logo`}
            />
            <span className="sr-only">View my {socialChannel.name} profile.</span>
          </a>
        );
      })}
      {children}
    </div>
  );
}
