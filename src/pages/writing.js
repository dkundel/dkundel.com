import React from 'react';
import Link from 'gatsby-link';

import ArticleList from '../components/ArticleList';

const Writing = ({ data }) => {
  const { _heading, online, print } = data.aboutJson.technicalWriting;
  return (
    <div>
      <h1>{_heading}</h1>
      <h2>{online._heading}</h2>
      <ArticleList list={online._list} reverseOrder={true} />
      <h2>{print._heading}</h2>
      <ArticleList list={print._list} />
    </div>
  );
};

export const query = graphql`
  query WritingData {
    aboutJson {
      technicalWriting {
        _heading
        online {
          _heading
          _list
        }
        print {
          _heading
          _list
        }
      }
    }
  }
`;

export default Writing;
