import parse from 'date-fns/parse/index.js';
import React from 'react';
import { cn } from '../../utils/cn';
import Html from '../Html';

const classes = {
  container: 'talk-entry bg-white dark:bg-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 dark:border-[0.5px] dark:border-slate-700 shadow-md rounded-lg overflow-hidden mb-6 p-3 hover:shadow-lg focus:shadow-lg focus-within:shadow-lg max-w-[800px] hover:scale-[1.02] focus:scale-[1.02] focus-within:scale-[1.02] transition-transform',
  event: 'text-md dark:text-pink-400 font-semibold mx-0 mb-0',
  topic: 'text-sm dark:text-gray-300 mx-0 my-2 pb-2 border-0 dark:border-b-0 border-b-2 border-solid border-secondaryGreen-500',
  date: 'flex-shrink mr-3 small-all-caps',
  info: 'flex-shrink small-all-caps',
  meta: 'w-auto flex justify-between flex-wrap',
};

const Talk = ({ info }) => {
  const { event, location, date, topic, other } = info;
  return (
    <section className={classes.container}>
      <h4 className={classes.event}>
        <Html as="span">{event}</Html>
      </h4>
      <p className={classes.topic}>
        <Html as="span">{topic}</Html>
      </p>
      <div className={classes.meta}>
        <p className={classes.date}>
          {date} @ {location}
        </p>
        {other.trim().length > 0 && <p className={classes.info}>
          Additional Material:{' '}
          <Html as="span">
            {other
              .replace(' Slides', '&nbsp;Slides')
              .replace(' Video', '&nbsp;Video')}
          </Html>
        </p>}
      </div>
    </section>
  );
};

const TalkList = ({ talks, collapsed = false, className, ...props }) => {
  const list = collapsed
    ? ''
    : talks
        .sort(sortByEventDate)
        .map(talkInfo => <Talk info={talkInfo} key={talkInfo.date + talkInfo.topic}/>);
  return (
    <div className={cn(className)} {...props}>
      {list}
    </div>
  );
};

function sortByEventDate(talkA, talkB) {
  const format = 'MMMM d, yyyy';
  const dateA = parse(talkA.date, format, new Date());
  const dateB = parse(talkB.date, format, new Date());
  return dateB.getTime() - dateA.getTime();
}

export default TalkList;
