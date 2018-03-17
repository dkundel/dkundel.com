import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import TalkList from '../components/TalkList';

const ListContainer = styled.div``;

const Writing = ({ data }) => {
  const talks = groupPresentationsByYear(
    data.aboutJson.pastPresentations._entries
  );
  const years = Object.keys(talks).sort((a, b) => b - a);
  const talkOverview = years.map(year => {
    return (
      <ListContainer>
        <h2>{year}</h2>
        <TalkList talks={talks[year]} />
      </ListContainer>
    );
  });
  return (
    <div>
      <h1>{data.aboutJson.pastPresentations._heading}</h1>
      {talkOverview}
    </div>
  );
};

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
