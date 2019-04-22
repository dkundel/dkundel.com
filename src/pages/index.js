import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Html from '../components/Html';
import InfoHeader from '../components/InfoHeader';
import Layout from '../components/layout';
import SEO from '../components/seo';

const SocialList = styled.ul`
  list-style: none;
  margin-left: 0;
`;

const Paragraphs = ({ list }) => (
  <div>
    {list.map(content => (
      <Html as="p" key={content.substr(6)}>
        {content}
      </Html>
    ))}
  </div>
);
const IndexPage = ({ data }) => {
  const bio = data.aboutJson.biography._paragraphs;
  const talkText = data.aboutJson.biography.examplesOfPreviousTalks._paragraphs;
  const talks = data.aboutJson.biography.examplesOfPreviousTalks._list;
  const social = data.aboutJson.socialChannels._list;
  return (
    <Layout>
      <SEO title="About Me" keywords={[`dkundel`, `javascript`, `speaker`]} />
      <InfoHeader headerInfo={data.aboutJson.header} />
      <h2>{data.aboutJson.biography._heading}</h2>
      <Paragraphs list={bio} />
      <h3>{data.aboutJson.biography.examplesOfPreviousTalks._heading}</h3>
      <Paragraphs list={talkText} />
      <ul>
        {talks.map(talk => (
          <Html as="li" key={talk.substr(4)}>
            {talk}
          </Html>
        ))}
      </ul>
      <h2>{data.aboutJson.socialChannels._heading}</h2>
      <SocialList>
        {social.map(channel => (
          <Html as="li" key={channel.substr(4)}>
            {channel}
          </Html>
        ))}
      </SocialList>
    </Layout>
  );
};

export const query = graphql`
  query IndexData {
    aboutJson {
      header: _raw
      biography {
        _paragraphs
        examplesOfPreviousTalks {
          _paragraphs
          _heading
          _list
        }
        _heading
      }
      socialChannels {
        _heading
        _list
      }
    }
  }
`;

export default IndexPage;
