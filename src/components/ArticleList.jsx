import React from 'react';
import styled from '../utils/styled';
import { smallAllCaps } from '../utils/tailwind-helpers';
import Html from './Html';

const ArticleListContainer = styled('div', 'flex flex-wrap justify-around lg:justify-start');

function ArticleWrapper({ hasImage, children, ...props }) {
  const imageClasses = hasImage ? 'min-h-[14rem] max-w-full' : 'min-h-0';
  return <div className={`bg-white w-auto mx-2 max-w-xs shadow-md rounded-lg overflow-hidden mb-6 p-0 flex flex-col cursor-pointer hover:no-underline hover:shadow-lg focus:shadow-lg focus-within:shadow-lg ${imageClasses}`} {...props}>{children}</div>
}

const ArticleInfo = styled('div', 'flex flex-col flex-1 px-3 py-2 justify-between')
const ArticleLanguage = styled('span', '');
const ArticleTitle = styled('h3', "text-base")
const ArticleMeta = styled('p', `normal-case ${smallAllCaps}`)
const ArticleDate = styled('span', 'uppercase')
const ArticlePlatform = styled('a', '');
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
  const match = link.match(linkRegExp);
  if (match) {
    result.url = match[1];
    result.onWebsite = result.url
      .match(/(.*?\.\w+)\//)[1]
      .replace(/^http(s)?:\/\//, '');
  }
  return result;
}

export default ArticleList;
