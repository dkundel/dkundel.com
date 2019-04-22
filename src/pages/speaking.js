import { purpleShades } from 'anker-colors';
import { graphql } from 'gatsby';
import React, { Component } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TalkList from '../components/TalkList';
import SpeakingIcon from '../icons/Speaking';

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
  ${tw`flex justify-between items-end flex-wrap flex-row-reverse content-end`}
`;

const Heading = styled.h1`
  ${tw`flex-no-shrink flex-grow`}
`;

const StyledSpeakingIcon = styled(SpeakingIcon)`
  ${tw`flex-grow center w-12`}
  min-width: 3rem;
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
    return (
      <Layout>
        <SectionHeader>
          <StyledSpeakingIcon width="200" />
          <Heading>
            {this.props.data.aboutJson.pastPresentations._heading}
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
    }
  }
`;

export default Speaking;
