import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { smallAllCaps } from '../utils/tailwind-helpers';
import Html from './Html';

const ArticleListContainer = styled.div`
  ${tw`flex flex-wrap justify-around lg:justify-start`}
`;
const ArticleWrapper = styled.div`
  ${tw`bg-white w-auto mx-2 max-w-xs shadow-md rounded-lg overflow-hidden mb-6 p-0`}
  ${tw`flex flex-col`}
  ${tw`cursor-pointer`}
  ${tw`hover:no-underline hover:shadow-lg focus:shadow-lg focus-within:shadow-lg`}
  min-height: ${props => (props.hasImage ? '14rem' : '0')};
  ${props => (!props.hasImage ? tw`max-w-full` : '')}
`;
const ArticleInfo = styled.div`
  ${tw`flex flex-col flex-1 px-3 py-2 justify-between`}
`;
const ArticleLanguage = styled.span``;
const ArticleTitle = styled.h3`
  ${tw`text-base`}
`;
const ArticleMeta = styled.p`
  ${smallAllCaps}
  ${tw`normal-case`}
`;
const ArticleDate = styled.span`
  ${tw`uppercase`}
`;
const ArticlePlatform = styled.a``;
const ArticleImage = styled.img`
  ${tw`mb-1`}
  min-width: 360px;
  min-height: 135px;
`;

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
