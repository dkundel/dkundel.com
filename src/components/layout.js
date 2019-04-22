/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import { graphql, StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../utils/globalStyles';
import Footer from './Footer';
import Header from './Header';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;
const Main = styled.div`
  flex: 1;
  max-width: 800px;
  width: 100%;
  padding: 20px;
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            name
          }
        }
      }
    `}
    render={data => (
      <Container>
        <GlobalStyles />
        <Header name={data.site.siteMetadata.name} />
        <Main role="main">{children}</Main>
        <Footer />
      </Container>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
