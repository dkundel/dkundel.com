import emojiRegex from 'emoji-regex';
import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import Html from '../components/Html';
import InfoHeader from '../components/InfoHeader';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { smallAllCaps } from '../utils/tailwind-helpers';

const SocialList = styled.ul`
  list-style: none;
  margin-left: 0;
  ${tw`flex flex-wrap`}

  li {
    ${tw`w-auto flex-1 flex-no-shrink text-sm mx-2 text-center`}
    a {
      ${tw`bg-white shadow px-2 py-1 text-center inline-block rounded hover:shadow-lg`}
      width: 200px;
    }
  }
`;

const StyledParagraphs = styled.div`
  ${tw`text-base mb-2`}

  p:last-of-type {
    ${tw`mb-0`}
  }
`;

const Paragraphs = ({ list }) => (
  <StyledParagraphs>
    {list.map(content => (
      <Html as="p" key={content.substr(6)}>
        {content}
      </Html>
    ))}
  </StyledParagraphs>
);

const TopicList = styled.ul`
  ${tw`mb-3 ml-2`}

  li {
    list-style: none;
    ${smallAllCaps}
    ${tw`p-0 mb-2 mx-0 text-xs`}

    a {
      ${tw`text-sm normal-case`}
    }

    &::before {
      ${tw`pl-5 pt-1`}
      content: '';
      display: inline-block;
      height: 1em;
      width: 1em;
      background-image: url('/icons/arrow-outline.svg');
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
`;

const SubsectionHeader = styled.h2`
  ${tw`text-sm mb-2 mt-8 font-bold uppercase text-grey-darker`}
`;

const globalEmojiRegex = new RegExp(emojiRegex(), 'g');
const removeEmoji = str =>
  str.replace(globalEmojiRegex, '').replace(globalEmojiRegex, '');

const linkRegEx = /<a .*<\/a>/;
function parseSocialChannels(channel) {
  const link = channel.match(linkRegEx)[0];
  const emoji = channel.replace(link, '').trim();
  const linkWithEmoji = link.replace('>', `> ${emoji} `);
  return {
    link,
    emoji,
    linkWithEmoji,
  };
}

const IndexPage = ({ data }) => {
  const bio = data.aboutJson.biography._paragraphs;
  const talkText = data.aboutJson.biography.examplesOfPreviousTalks._paragraphs;
  const talks = data.aboutJson.biography.examplesOfPreviousTalks._list;
  const social = data.aboutJson.socialChannels._list.map(parseSocialChannels);
  return (
    <Layout>
      <SEO title="About Me" keywords={[`dkundel`, `javascript`, `speaker`]} />
      <InfoHeader headerInfo={data.aboutJson.header} />
      <SubsectionHeader>Biography</SubsectionHeader>
      <Paragraphs list={bio} />
      <SubsectionHeader>Examples of previous talks</SubsectionHeader>
      <Paragraphs list={talkText} />
      <TopicList>
        {talks.map(talk => (
          <Html as="li" key={talk.substr(4)}>
            {talk}
          </Html>
        ))}
      </TopicList>
      <SubsectionHeader>Reach me on:</SubsectionHeader>
      <SocialList>
        {social.map(channel => (
          <Html as="li" key={channel.link.substr(8)}>
            {channel.linkWithEmoji}
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
