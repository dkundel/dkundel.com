function normalizePath(path) {
  return path === '/' ? path : (path.endsWith('/') ? path.slice(0, -1) : path);
}

function isSectionActive(path, section) {
  if (section === '/writing') {
    return path === '/writing' || path === '/blog' || path.startsWith('/blog/');
  }
  return path === section || path.startsWith(`${section}/`);
}

export function SiteHeader({ name, path = '/', children }) {
  const normalizedPath = normalizePath(path);
  const links = [
    { href: '/work', label: 'Work' },
    { href: '/speaking', label: 'Speaking' },
    { href: '/writing', label: 'Writing' },
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="wordmark" href="/" aria-label={`${name}, home`}>
          <span className="wordmark__full">{name}</span>
          <span className="wordmark__short" aria-hidden="true">DK</span>
        </a>
        <div className="site-header__actions">
          <nav className="primary-nav" aria-label="Primary navigation">
            {links.map(link => {
              const active = isSectionActive(normalizedPath, link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          {children}
        </div>
      </div>
    </header>
  );
}
