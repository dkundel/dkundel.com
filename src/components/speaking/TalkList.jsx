import parse from 'date-fns/parse/index.js';
import React from 'react';
import styled from '../../utils/styled';
import Html from '../Html';

const TalkListContainer = styled('div', '');

const TalkContainer = styled('section', 'talk-entry bg-white shadow-md rounded-lg overflow-hidden mb-6 p-3 hover:shadow-lg focus:shadow-lg focus-within:shadow-lg max-w-[800px] hover:scale-[1.02] focus:scale-[1.02] focus-within:scale-[1.02] transition-transform');
const TalkEvent = styled('h4', 'text-md font-semibold mx-0');
const TalkTopic = styled('p', 'text-sm mx-0 my-2 pb-2 border-0 border-b-2 border-solid border-secondaryGreen-500');
const TalkDate = styled('p', `flex-shrink mr-3 small-all-caps`);
const TalkInfo = styled('p', `flex-shrink small-all-caps`);
const TalkMetaContainer = styled('div', 'w-auto flex justify-between flex-wrap');

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
        {other.trim().length > 0 && <TalkInfo>
          Additional Material:{' '}
          <Html as="span">
            {other
              .replace(' Slides', '&nbsp;Slides')
              .replace(' Video', '&nbsp;Video')}
          </Html>
        </TalkInfo>}
      </TalkMetaContainer>
    </TalkContainer>
  );
};

const TalkList = ({ talks, collapsed = false }) => {
  const list = collapsed
    ? ''
    : talks
        .sort(sortByEventDate)
        .map(talkInfo => <Talk info={talkInfo} key={talkInfo.date + talkInfo.topic}/>);
  return <TalkListContainer>{list}</TalkListContainer>;
};

function sortByEventDate(talkA, talkB) {
  const format = 'MMMM d, yyyy';
  const dateA = parse(talkA.date, format, new Date());
  const dateB = parse(talkB.date, format, new Date());
  return dateB.getTime() - dateA.getTime();
}

export default TalkList;
