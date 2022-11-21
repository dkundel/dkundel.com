import React from 'react';
import Html from '../Html';
import styled from '../../utils/styled';

const TopicListContainer = styled('ul', 'topic-list');

function TopicList({talks, ...props}) {
  return <TopicListContainer {...props}>
    {talks.map(talk => (
      <Html as="li" key={talk.substr(4)}>
        {talk}
      </Html>
    ))}
  </TopicListContainer>
}

export default TopicList