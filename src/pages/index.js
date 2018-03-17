import React, { Fragment } from 'react';
import styled from 'styled-components';

import InfoHeader from '../components/InfoHeader';

const SocialList = styled.ul`
  list-style: none;
  margin-left: 0;
`;

const Paragraphs = ({ list }) => (
  <div>
    {list.map(content => <p dangerouslySetInnerHTML={{ __html: content }} />)}
  </div>
);
const IndexPage = ({ data }) => {
  const bio = data.aboutJson.biography._paragraphs;
  const talkText = data.aboutJson.biography.examplesOfPreviousTalks._paragraphs;
  const talks = data.aboutJson.biography.examplesOfPreviousTalks._list;
  const social = data.aboutJson.socialChannels._list;
  return (
    <div>
      <InfoHeader headerInfo={data.aboutJson.header} />
      <h2>{data.aboutJson.biography._heading}</h2>
      <Paragraphs list={bio} />
      <h3>{data.aboutJson.biography.examplesOfPreviousTalks._heading}</h3>
      <Paragraphs list={talkText} />
      <ul>
        {talks.map(talk => <li dangerouslySetInnerHTML={{ __html: talk }} />)}
      </ul>
      <h2>{data.aboutJson.socialChannels._heading}</h2>
      <SocialList>
        {social.map(channel => (
          <li dangerouslySetInnerHTML={{ __html: channel }} />
        ))}
      </SocialList>
    </div>
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
