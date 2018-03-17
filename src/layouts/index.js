import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import '../utils/globalStyles';

import Header from '../components/Header';
import Footer from '../components/Footer';

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

const TemplateWrapper = ({ children, data }) => (
  <Container>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header name={data.site.siteMetadata.name} />
    <Main role="main">{children()}</Main>
    <Footer />
  </Container>
);

export const query = graphql`
  query GetLayoutData {
    site {
      siteMetadata {
        title
        name
      }
    }
  }
`;

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
