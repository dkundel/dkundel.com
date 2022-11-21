import PropTypes from 'prop-types';
import React from 'react';
import sanitize from 'sanitize-html';

const extendedTags = sanitize.defaults.allowedTags.concat(['h1', 'h2', 'span']);

const Html = ({ children, as = 'div', sanitizeOptions }) => {
  const config = {
    allowedTags: extendedTags,
    allowedAttributes: {
      ...sanitize.defaults.allowedAttributes,
      '*': ['class', 'alt'],
    },
    ...sanitizeOptions,
  };
  const sanitizedHtml = sanitize(children, config);
  return React.createElement(as, {
    dangerouslySetInnerHTML: { __html: sanitizedHtml },
  });
};

export const allowImages = {
  allowedTags: extendedTags.concat(['img']),
  allowedAttributes: {
    ...sanitize.defaults.allowedAttributes,
    '*': ['class'],
    img: ['src', 'width', 'height', 'alt'],
  },
};

Html.propTypes = {
  children: PropTypes.string.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  sanitizeOptions: PropTypes.object,
};

export default Html;
