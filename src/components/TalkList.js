import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { purpleShades } from 'anker-colors';

const TalkListContainer = styled.div``;

const TalkContainer = styled.section`
  padding: 10px 20px;
  border-left: 5px solid ${purpleShades['500']};
  margin-bottom: 20px;
`;
const TalkDate = styled.p`
  font-size: 0.8em;
  margin-bottom: 0;
`;
const TalkEvent = styled.h3``;
const TalkTopic = styled.p``;
const TalkInfo = styled.p`
  font-size: 0.8em;
  margin: 0;
  a {
    margin-left: 5px;
  }
`;

const Talk = ({ info }) => {
  const { event, location, date, topic, other } = info;
  return (
    <TalkContainer>
      <TalkDate>
        {date} in {location}
      </TalkDate>
      <TalkEvent>
        <span dangerouslySetInnerHTML={{ __html: event }} />
      </TalkEvent>
      <TalkTopic>
        Topic: <span dangerouslySetInnerHTML={{ __html: topic }} />
      </TalkTopic>
      <TalkInfo>
        Additional Material:{' '}
        <span dangerouslySetInnerHTML={{ __html: other }} />
      </TalkInfo>
    </TalkContainer>
  );
};

const TalkList = ({ talks }) => (
  <TalkListContainer>
    {talks.sort(sortByEventDate).map(talkInfo => <Talk info={talkInfo} />)}
  </TalkListContainer>
);

function sortByEventDate(talkA, talkB) {
  const format = 'MMMM D, YYYY';
  const dateA = moment(talkA.date, format);
  const dateB = moment(talkB.date, format);
  return dateB.valueOf() - dateA.valueOf();
}

export default TalkList;
