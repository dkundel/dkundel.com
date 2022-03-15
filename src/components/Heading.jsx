import React from 'react';
import styled from '../utils/styled';

const Heading = styled('hgroup', 'min-w-[7rem] flex-1 text-sm');
Heading.h1 = styled('h1', 'text-xl mb-2');
Heading.p = styled('p', 'mb-2');

export default Heading;