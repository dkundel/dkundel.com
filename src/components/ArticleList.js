import React from 'react';
import styled from 'styled-components';

import { purpleShades } from 'anker-colors';

const ArticleWrapper = styled.section`
  padding: 10px 20px;
  border-left: 5px solid ${purpleShades['500']};
  margin-bottom: 20px;
`;
const ArticleLanguage = styled.span``;
const ArticleTitle = styled.h3``;
const ArticleMeta = styled.p`
  font-size: 0.8em;
  margin-bottom: 0;
`;
const ArticleDate = styled.span``;
const ArticleListContainer = styled.div``;
const ArticlePlatform = styled.a``;

const Article = ({ language, link, date, url, onWebsite }) => {
  return (
    <ArticleWrapper>
      <ArticleTitle dangerouslySetInnerHTML={{ __html: link }} />
      <ArticleMeta>
        <ArticleLanguage>{language}</ArticleLanguage>{' '}
        <ArticleDate>{date}</ArticleDate> on{' '}
        <ArticlePlatform href={onWebsite} target="_blank">
          {onWebsite}
        </ArticlePlatform>
      </ArticleMeta>
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
      {entries.map(({ language, link, date, url, onWebsite }) => (
        <Article
          language={language}
          link={link}
          date={date}
          url={url}
          onWebsite={onWebsite}
        />
      ))}
    </ArticleListContainer>
  );
};

function parseListEntry(entry) {
  const regExp = /(.*?)\s+(.*)\s+\|\s+(.*?)$/;
  const linkRegExp = /href="(.*?)"/;
  const [, language, link, date] = entry.match(regExp);
  const result = { language, link, date };
  const match = link.match(linkRegExp);
  console.log(link, match);
  if (match) {
    result.url = match[1];
    result.onWebsite = result.url
      .match(/(.*?\.\w+)\//)[1]
      .replace(/^http(s)?:\/\//, '');
  }
  return result;
}

export default ArticleList;
