import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import { lightGray, secondaryGreen } from 'anker-colors';

import Anchor from './Anchor';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background: ${lightGray};
  padding: 20px 20px;
  width: 100%;
`;
const Navigation = styled.nav`
  a {
    margin-left: 20px;
  }
`;

const PageTitleContainer = styled.hgroup`
  margin: 0;
  display: flex;

  :hover {
    svg {
      transform: rotateZ(0deg);
    }
  }

  svg {
    margin-right: 0px;
    width: auto;
    height: 1.5em;
    transform: rotateZ(22.5deg);
    transition: transform 0.5s ease;
  }
`;

const PageTitle = styled.h2`
  margin: 0;
  padding: 0;
`;

const Header = ({ name }) => (
  <HeaderContainer>
    <PageTitleContainer>
      <Anchor color={secondaryGreen} />
      <PageTitle>{name}</PageTitle>
    </PageTitleContainer>
    <Navigation>
      <Link to="/">About Me</Link>
      <Link to="/writing">Writing</Link>
      <Link to="/speaking">Speaking</Link>
    </Navigation>
  </HeaderContainer>
);

export default Header;
