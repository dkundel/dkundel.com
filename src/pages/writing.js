import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import ArticleList from '../components/ArticleList';
import Layout from '../components/layout';
import SEO from '../components/seo';
import WritingIcon from '../icons/Writing';

const SectionHeader = styled.header`
  ${tw`flex justify-between items-start flex-wrap flex-row-reverse content-end`}
`;

const Heading = styled.hgroup`
  min-width: 19rem;
  ${tw`flex-1 text-sm`}

  h1 {
    ${tw`text-xl mb-2`}
  }

  p {
    ${tw`mb-2`}
  }
`;

const SubsectionHeader = styled.h2`
  ${tw`text-sm mb-2 font-bold uppercase text-grey-darker`}
`;

const StyledWritingIcon = styled(WritingIcon)`
  ${tw`flex-grow center w-12 mx-auto`}
  min-width: 10rem;
  max-width: 25%;
`;

const Writing = ({ data }) => {
  const { _heading, online, print } = data.aboutJson.technicalWriting;
  return (
    <Layout>
      <SEO title="Technical Writing" />
      <SectionHeader>
        <StyledWritingIcon width="200" />
        <Heading>
          <h1>Technical Writing</h1>
          <p>
            I love telling stories through code and explaining technical
            concepts. As a result you'll find me regularly blogging on various
            platforms such as{' '}
            <a href="https://twilio.com/blog/author/dkundel">the Twilio Blog</a>
            , <a href="https://dev.to/dkundel">dev.to</a>, or{' '}
            <a href="https://moin.world">my personal blog</a>.
          </p>
          <p>
            Here's a list of some of my technical content published online and
            in print.
          </p>
        </Heading>
      </SectionHeader>
      <SubsectionHeader>Online Posts</SubsectionHeader>
      <ArticleList list={online._listExtended} reverseOrder={true} />
      <SubsectionHeader>Printed Articles</SubsectionHeader>
      <ArticleList list={print._list} />
    </Layout>
  );
};

export const query = graphql`
  query WritingData {
    aboutJson {
      technicalWriting {
        _heading
        online {
          _heading
          _listExtended {
            html
            url
            image
          }
        }
        print {
          _heading
          _list
        }
      }
    }
  }
`;

export default Writing;
