import { InteractiveCard } from '../ui/card.jsx';

export function ArticleList({ list = [], reverseOrder = false }) {
  const entries = list.map(parseListEntry).filter(Boolean);
  if (reverseOrder) {
    entries.reverse();
  }

  return (
    <div className="grid article-list-container justify-items-center justify-around lg:justify-start">
      {entries.map(article => (
        <ArticleCard article={article} key={article.url} />
      ))}
    </div>
  );
}

function ArticleCard({ article }) {
  const { language, title, date, url, onWebsite, image } = article;
  const isExternal = !url.startsWith('/');
  const imageClasses = image ? 'min-h-[14rem] max-w-full' : 'min-h-0';

  return (
    <InteractiveCard
      className={`w-[300px] mx-2 max-w-xs mb-6 p-0 flex justify-between flex-col cursor-pointer hover:no-underline ${imageClasses}`}
      href={url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {image ? (
        <div className="mb-1">
          <img
            className="max-h-[150px] object-cover bg-white dark:bg-slate-800 w-full"
            src={image}
            alt="decorative header image of blog post"
          />
        </div>
      ) : null}
      <div className="flex flex-col flex-1 px-3 py-2 justify-between min-h-[100px] max-h-[120px]">
        <h3 className="text-base font-bold pb-4 mb-0 text-purple-300 dark:text-gray-300 dark:hover:text-white">
          {title}
        </h3>
        <p className="normal-case text-gray-500 dark:text-gray-300 text-xs m-0 tracking-wider uppercase">
          <span>{language}</span>{' '}
          <span className="uppercase">{date}</span> on{' '}
          <span className="text-purple-300 dark:text-pink-400">{onWebsite}</span>
        </p>
      </div>
    </InteractiveCard>
  );
}

function parseListEntry(entry) {
  let info = entry;
  if (typeof info !== 'string') {
    info = entry.html;
  }

  const parsedInfo = info.match(/(.*?)\s+(.*)\s+\|\s+(.*?)$/);
  if (!parsedInfo) {
    return null;
  }

  const [, language, link, date] = parsedInfo;
  const result = {
    language,
    title: stripHtml(link),
    date,
    image: entry.image || undefined,
    url: entry.url,
  };

  if (!result.url) {
    result.url = link.match(/href="(.*?)"/)?.[1];
  }

  if (!result.url) {
    return null;
  }

  result.onWebsite = result.url.startsWith('/')
    ? 'dkundel.com'
    : getHostname(result.url);

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
