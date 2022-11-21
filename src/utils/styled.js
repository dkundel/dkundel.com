import React from 'react';

const styled = (element, classes) => {
  return ({ children, ...props }) => {
    return React.createElement(
      element,
      { className: classes, ...props },
      children
    );
  };
};

export default styled;
