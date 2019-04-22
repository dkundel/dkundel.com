import { purpleShades } from 'anker-colors';
import { graphql } from 'gatsby';
import React, { Component } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TalkList from '../components/TalkList';

const ListContainer = styled.div``;
const TalkYear = styled.h2`
  margin-bottom: 10px;
  display: inline-block;
  margin-right: 10px;
`;

const ToggleButton = styled.button`
  font-size: 0.8em;
  background: transparent;
  color: ${purpleShades['300']};
  cursor: pointer;
  border: 0;
  padding: 0;
  margin-bottom: 1.6em;

  &:hover,
  &:focus {
    text-decoration: underline;
    color: ${purpleShades['700']};
  }
`;

class Writing extends Component {
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
        <ListContainer>
          <div>
            <TalkYear>{year}</TalkYear>
            {!collapsed && hideButton}
          </div>
          <TalkList talks={this.talks[year]} collapsed={collapsed} />
          {collapsed && showButton}
        </ListContainer>
      );
    });
    return (
      <Layout>
        <h1>{this.props.data.aboutJson.pastPresentations._heading}</h1>
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

export default Writing;
