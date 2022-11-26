import React from 'react';
import styled from '../utils/styled';
import { smallAllCaps } from '../utils/tailwind-helpers';
import Html from './Html';

const ArticleListContainer = styled('div', 'grid article-list-container justify-items-center justify-around lg:justify-start');

function ArticleWrapper({ hasImage, children, ...props }) {
  const imageClasses = hasImage ? 'min-h-[14rem] max-w-full' : 'min-h-0';
  return <div className={`bg-white w-[300px] mx-2 max-w-xs shadow-md rounded-lg overflow-hidden mb-6 p-0 flex justify-between flex-col cursor-pointer hover:no-underline hover:scale-[1.02] focus:scale-[1.02] focus-within:scale-[1.02] transition-transform hover:shadow-xl focus:shadow-xl focus-within:shadow-xl ${imageClasses}`} {...props}>{children}</div>
}

const ArticleInfo = styled('div', 'flex grow-0 flex-col flex-1 px-3 py-2 justify-between min-h-[100px]')
const ArticleLanguage = styled('span', '');
const ArticleTitle = styled('h3', "text-base font-bold pb-4 mb-0 text-purple-300")
const ArticleMeta = styled('p', `normal-case ${smallAllCaps} text-gray-500 `)
const ArticleDate = styled('span', 'uppercase')
const ArticlePlatform = styled('a', 'text-purple-300');
const ArticleImage = styled('img', 'mb-1');

const Article = ({ language, link, date, url, onWebsite, image }) => {
  return (
    <ArticleWrapper
      onClick={() => window.open(url, '_blank')}
      hasImage={!!image}
      rel="noopener noreferrer"
    >
      {image ? (
        <ArticleImage src={image} alt="decorative header image of blog post" />
      ) : null}
      <ArticleInfo>
        <Html as={ArticleTitle}>{link}</Html>
        <ArticleMeta>
          <ArticleLanguage>{language}</ArticleLanguage>{' '}
          <ArticleDate>{date}</ArticleDate> on{' '}
          <ArticlePlatform href={`https://${onWebsite}`} target="_blank">
            {onWebsite}
          </ArticlePlatform>
        </ArticleMeta>
      </ArticleInfo>
    </ArticleWrapper>
  );
};

const ArticleList = ({ list, reverseOrder = false }) => {
  let entries = list.map(parseListEntry);
  if (reverseOrder) {
    entries = entries.reverse();
  }
  return (
    <ArticleListContainer>
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
    </ArticleListContainer>
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
