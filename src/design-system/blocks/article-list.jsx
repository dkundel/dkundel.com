import { InteractiveCard } from '../ui/card.jsx';

/**
 * @param {{
 *   list?: Array<string | { html: string, url?: string, image?: string }>,
 *   reverseOrder?: boolean,
 *   featuredCount?: number,
 *   archiveLabel?: string
 * }} props
 */
export function ArticleList({
  list = [],
  reverseOrder = false,
  featuredCount = 6,
  archiveLabel = 'Browse the full archive',
}) {
  const entries = list.map(parseListEntry).filter(Boolean);
  if (reverseOrder) entries.reverse();

  const featured = entries.slice(0, featuredCount);
  const archive = entries.slice(featuredCount);

  return (
    <>
      {featured.length > 0 ? (
        <ul className="article-feature-list">
          {featured.map((article, index) => (
            <li key={article.url}>
              <ArticleCard article={article} eager={index === 0} />
            </li>
          ))}
        </ul>
      ) : null}
      {archive.length > 0 ? (
        <details className="archive-disclosure">
          <summary className="archive-summary">
            <span>{archiveLabel}</span>
            <span className="small-all-caps">{archive.length} more</span>
          </summary>
          <ol className="archive-list">
            {archive.map(article => (
              <li className="archive-row" key={article.url}>
                <a
                  href={article.url}
                  target={article.isExternal ? '_blank' : undefined}
                  rel={article.isExternal ? 'noopener noreferrer' : undefined}
                >
                  <span className="archive-row__title">{article.title}</span>
                  <span className="archive-row__meta">
                    {article.date} · {article.onWebsite}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </details>
      ) : null}
    </>
  );
}

function ArticleCard({ article, eager }) {
  const { language, title, date, url, onWebsite, image, isExternal } = article;

  return (
    <InteractiveCard
      className="article-card"
      href={url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {image ? (
        <img
          className="article-card__image"
          src={image}
          width="600"
          height="315"
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <div className="article-card__image" aria-hidden="true" />
      )}
      <div className="article-card__body">
        <h3 className="article-card__title">{title}</h3>
        <p className="article-meta">
          {language ? <span>{language}</span> : null}
          {language && date ? <span aria-hidden="true">·</span> : null}
          {date ? <span>{date}</span> : null}
          <span aria-hidden="true">·</span>
          <span className="article-meta__source">{onWebsite}</span>
        </p>
      </div>
    </InteractiveCard>
  );
}

function parseListEntry(entry) {
  let info = entry;
  if (typeof info !== 'string') info = entry.html;
  if (typeof info !== 'string') return null;

  const parsedInfo = info.match(/(.*?)\s+(.*)\s+\|\s+(.*?)$/);
  const link = parsedInfo?.[2] || info;
  const result = {
    language: parsedInfo?.[1]?.trim() || '',
    title: stripHtml(link).trim(),
    date: parsedInfo?.[3]?.trim() || '',
    image: typeof entry === 'object' ? entry.image : undefined,
    url: typeof entry === 'object' ? entry.url : undefined,
  };

  if (!result.url) result.url = link.match(/href="(.*?)"/)?.[1];
  if (!result.url || !result.title) return null;

  result.isExternal = !result.url.startsWith('/');
  result.onWebsite = result.isExternal ? getHostname(result.url) : 'dkundel.com';
  return result;
}

function getHostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function stripHtml(value) {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}
