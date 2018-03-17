import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import { lightGray } from 'anker-colors';

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
`;

const PageTitle = styled.h2`
  margin: 0;
  padding: 0;
`;

const Header = ({ name }) => (
  <HeaderContainer>
    <PageTitleContainer>
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
