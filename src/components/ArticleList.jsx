import React from 'react';
import { cn } from '../utils/cn';
import { smallAllCaps } from '../utils/tailwind-helpers';
import Html from './Html';

const classes = {
  list: 'grid article-list-container justify-items-center justify-around lg:justify-start',
  info: 'flex flex-col flex-1 px-3 py-2 justify-between min-h-[100px] max-h-[120px]',
  title: 'text-base font-bold pb-4 mb-0 text-purple-300 dark:text-gray-300 dark:hover:text-white',
  meta: `normal-case ${smallAllCaps} text-gray-500 dark:text-gray-300 `,
  date: 'uppercase',
  platform: 'text-purple-300 dark:text-pink-400',
  imageContainer: 'mb-1',
  image: 'max-h-[150px] object-cover bg-white dark:bg-slate-800 w-full',
};

function ArticleWrapper({ hasImage, children, ...props }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:border-[0.5px] dark:border-slate-700 w-[300px] mx-2 max-w-xs shadow-md rounded-lg overflow-hidden mb-6 p-0 flex justify-between flex-col cursor-pointer hover:no-underline hover:scale-[1.02] focus:scale-[1.02] focus-within:scale-[1.02] transition-transform hover:shadow-xl focus:shadow-xl focus-within:shadow-xl',
        hasImage ? 'min-h-[14rem] max-w-full' : 'min-h-0'
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const ArticleTitle = ({ children, ...props }) => (
  <h3 className={classes.title} {...props}>
    {children}
  </h3>
);

const Article = ({ language, link, date, url, onWebsite, image }) => {
  return (
    <ArticleWrapper
      onClick={() => window.open(url, '_blank')}
      hasImage={!!image}
      rel="noopener noreferrer"
    >
      {image ? (
        <div className={classes.imageContainer}>
          <img
            className={classes.image}
            src={image}
            alt="decorative header image of blog post"
          />
        </div>
      ) : null}
      <div className={classes.info}>
        <Html as={ArticleTitle}>{link}</Html>
        <p className={classes.meta}>
          <span>{language}</span>{' '}
          <span className={classes.date}>{date}</span> on{' '}
          <a className={classes.platform} href={`https://${onWebsite}`} target="_blank">
            {onWebsite}
          </a>
        </p>
      </div>
    </ArticleWrapper>
  );
};

const ArticleList = ({ list, reverseOrder = false }) => {
  let entries = list.map(parseListEntry);
  if (reverseOrder) {
    entries = entries.reverse();
  }
  return (
    <div className={classes.list}>
      {entries.map(({ language, link, date, url, onWebsite, image }) => (
        <Article
          key={url}
          language={language}
          link={link}
          date={date}
          url={url}
          onWebsite={onWebsite}
          image={image}
        />
      ))}
    </div>
  );
};

function parseListEntry(entry) {
  let info = entry;
  if (typeof info !== 'string') {
    info = entry.html;
  }
  const regExp = /(.*?)\s+(.*)\s+\|\s+(.*?)$/;
  const linkRegExp = /href="(.*?)"/;
  const [, language, link, date] = info.match(regExp);
  const image = entry.image || undefined;
  const result = { language, link, date, image };
  const url = entry.url;
  const match = link.match(linkRegExp);
  if (url) {
    result.url = url;
  } else if (match) {
    result.url = match[1];
  }
    
  if (result.url.startsWith('/')) {
    result.onWebsite = 'dkundel.com'
  } else if (typeof result.url === 'string' ) {
    result.onWebsite = result.url
      .match(/(.*?\.\w+)\//)[1]
      .replace(/^http(s)?:\/\//, '');
  }
  
  return result;
}

export default ArticleList;
