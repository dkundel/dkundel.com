import React from 'react';
import styled from '../utils/styled';

const Heading = styled('hgroup', 'min-w-[7rem] flex-1 text-sm');
Heading.h1 = styled('h1', 'text-6xl large-headings font-black mb-2 text-highlight-gradient leading-[1.4em]');
Heading.p = styled('p', 'mb-2 text-base');

export default Heading;