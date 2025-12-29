import React from 'react';
import { cn } from '../../utils/cn';
import Html from '../Html';

const Paragraphs = ({ list, className, ...props }) => (
  <div
    className={cn('text-base mb-2 styled-paragraphs', className)}
    {...props}
  >
    {list.map(content => (
      <Html as="p" key={content.substr(6)}>
        {content}
      </Html>
    ))}
  </div>
);

export default Paragraphs;
