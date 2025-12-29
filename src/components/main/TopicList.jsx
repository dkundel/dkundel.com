import React from 'react';
import { cn } from '../../utils/cn';
import Html from '../Html';

function TopicList({talks, ...props}) {
  const { className, ...rest } = props;
  return <ul className={cn('topic-list', className)} {...rest}>
    {talks.map(talk => (
      <Html as="li" key={talk.substr(4)}>
        {talk}
      </Html>
    ))}
  </ul>
}

export default TopicList
