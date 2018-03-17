import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/Header';

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header headerInfo={data.aboutJson.header} />
    <div role="main">{children()}</div>
  </div>
);

export const query = graphql`
  query GetLayoutData {
    site {
      siteMetadata {
        title
      }
    }
    aboutJson {
      header: _raw
    }
  }
`;

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
