import { purpleShades } from 'anker-colors';
import { graphql } from 'gatsby';
import React, { Component } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import md5 from 'tiny-hashes/md5';
import Html from '../components/Html';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TalkList from '../components/TalkList';
import SpeakingIcon from '../icons/Speaking';
import { smallAllCaps } from '../utils/tailwind-helpers';

const ListContainer = styled.div``;
const TalkYear = styled.h2`
  ${tw`mb-4 inline-block mr-2 text-base font-bold text-grey-darkest tracking-wide`}
`;

const TalkYearContainer = styled.div``;

const ToggleButton = styled.button`
  ${tw`text-xs bg-transparent cursor-pointer border-0 p-0 mb-4 hover:underline focus:underline`}
  color: ${purpleShades['300']};

  &:hover,
  &:focus {
    color: ${purpleShades['700']};
  }
`;

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

const TopicList = styled.ul`
  ${tw`mb-3 ml-2`}

  li {
    ${tw`p-0 my-2 mx-0 text-xs`}
    list-style: none;
    ${smallAllCaps}

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

const ZeroMarginP = styled.p`
  ${tw`m-0`}
`;

const StyledSpeakingIcon = styled(SpeakingIcon)`
  ${tw`flex-grow center w-12 mx-auto`}
  min-width: 10rem;
  max-width: 25%;
`;

class Speaking extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { openedSections: {} };
  }
  componentWillMount() {
    this.talks = groupPresentationsByYear(
      this.props.data.aboutJson.pastPresentations._entries
    );
    const openedSections = Object.keys(this.talks)
      .sort((a, b) => +b - +a)
      .reduce((obj, key, idx) => {
        obj[key] = idx === 0;
        return obj;
      }, {});
    this.setState({ openedSections });
  }

  toggleSection(year) {
    const openedSections = { ...this.state.openedSections };
    openedSections[year] = !openedSections[year];
    this.setState({ openedSections });
  }

  render() {
    const years = Object.keys(this.talks).sort((a, b) => +b - +a);
    const talkOverview = years.map((year, idx) => {
      const showButton = (
        <ToggleButton onClick={() => this.toggleSection(year)}>
          Show {this.talks[year].length} talks
        </ToggleButton>
      );
      const hideButton = (
        <ToggleButton onClick={() => this.toggleSection(year)}>
          Hide talks
        </ToggleButton>
      );
      const collapsed = !this.state.openedSections[year];
      return (
        <ListContainer key={year}>
          <TalkYearContainer>
            <TalkYear>{year}</TalkYear>
            {!collapsed && hideButton}
          </TalkYearContainer>
          <TalkList talks={this.talks[year]} collapsed={collapsed} />
          {collapsed && showButton}
        </ListContainer>
      );
    });
    console.log(this.props.data);
    return (
      <Layout>
        <SectionHeader>
          <StyledSpeakingIcon width="200" />
          <Heading>
            <h1>Past Presentations</h1>
            <p>
              During my time as a developer, I learned a lot from my peers and
              as a result I try to give back whenever possible. One way for me
              to do this is by giving presentations about a variety of topics.
            </p>
            <ZeroMarginP>Among others these topics include:</ZeroMarginP>
            <TopicList>
              {this.props.data.aboutJson.currentTalkTopics._list.map(topic => {
                return (
                  <Html as="li" key={md5(topic)}>
                    {topic}
                  </Html>
                );
              })}
            </TopicList>
            <ZeroMarginP>
              You can find a comprehensive{' '}
              <a href="https://github.com/dkundel/about-me/tree/master/abstracts">
                list on my GitHub
              </a>
              .
            </ZeroMarginP>
          </Heading>
        </SectionHeader>
        <SEO title="Speaking" />
        {talkOverview}
      </Layout>
    );
  }
}

function groupPresentationsByYear(list) {
  return list.reduce((byYear, talk) => {
    const [, year] = talk.date.match(/,\s*(\d{4})$/);
    if (byYear[year]) {
      byYear[year].push(talk);
    } else {
      byYear[year] = [talk];
    }
    return byYear;
  }, {});
}

export const query = graphql`
  query SpeakingData {
    aboutJson {
      pastPresentations {
        _heading
        _entries {
          event
          location
          date
          topic
          other
        }
      }
      currentTalkTopics {
        _list
      }
    }
  }
`;

export default Speaking;
