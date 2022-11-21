import React from 'react';
import styled from '../../utils/styled';
import Html from '../Html';

const StyledParagraphs = styled('div', 'text-base mb-2 styled-paragraphs');

const Paragraphs = ({ list }) => (
  <StyledParagraphs>
    {list.map(content => (
      <Html as="p" key={content.substr(6)}>
        {content}
      </Html>
    ))}
  </StyledParagraphs>
);

export default Paragraphs;