import { createElement } from 'react';
import sanitize from 'sanitize-html';

export function SafeHtml({ as = 'div', html = '', sanitizeOptions, className }) {
  const config = {
    allowedTags: sanitize.defaults.allowedTags.concat(['h1', 'h2', 'span']),
    ...sanitizeOptions,
  };

  return createElement(as, {
    className,
    dangerouslySetInnerHTML: {
      __html: sanitize(html, config),
    },
  });
}
