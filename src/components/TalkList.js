import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { smallAllCaps } from '../utils/tailwind-helpers';
import Html from './Html';

const TalkListContainer = styled.div``;

const TalkContainer = styled.section`
  ${tw`bg-white mx-auto max-w-lg shadow-lg rounded-lg overflow-hidden mb-6 p-3`}
`;
const TalkEvent = styled.h3`
  ${tw`text-sm font-semibold my-2 pb-2 mx-0 border-0 border-b-2 border-solid border-green`}
`;
const TalkTopic = styled.p`
  ${tw`text-sm mx-0 my-2`}
`;
const TalkDate = styled.p`
  ${smallAllCaps}
  ${tw`flex-shrink mr-3`}
`;
const TalkInfo = styled.p`
  ${tw`flex-shrink`}
  ${smallAllCaps}
  a {
    margin-left: 5px;
  }
`;
const TalkMetaContainer = styled.div`
  ${tw`w-auto flex justify-between flex-wrap`}
`;

const Talk = ({ info }) => {
  const { event, location, date, topic, other } = info;
  return (
    <TalkContainer>
      <TalkEvent>
        <Html as="span">{event}</Html>
      </TalkEvent>
      <TalkTopic>
        <Html as="span">{topic}</Html>
      </TalkTopic>
      <TalkMetaContainer>
        <TalkDate>
          {date} @ {location}
        </TalkDate>
        <TalkInfo>
          Additional Material: <Html as="span">{other}</Html>
        </TalkInfo>
      </TalkMetaContainer>
    </TalkContainer>
  );
};

const TalkList = ({ talks, collapsed = false }) => {
  const list = collapsed
    ? ''
    : talks
        .sort(sortByEventDate)
        .map(talkInfo => <Talk info={talkInfo} key={talkInfo.date} />);
  return <TalkListContainer>{list}</TalkListContainer>;
};

function sortByEventDate(talkA, talkB) {
  const format = 'MMMM D, YYYY';
  const dateA = moment(talkA.date, format);
  const dateB = moment(talkB.date, format);
  return dateB.valueOf() - dateA.valueOf();
}

export default TalkList;
