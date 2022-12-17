import React from 'react';

const styled = (element, classes) => {
  return ({ children, ...props }) => {
    const newClasses =
      classes +
      (props.class
        ? ' ' + props.class
        : props.className
        ? ' ' + props.className
        : '');
    delete props.class;
    const properties = {
      ...props,
      className: newClasses,
    };
    return React.createElement(element, properties, children);
  };
};

export default styled;
