import { graphql } from 'gatsby';
import React from "react";
import ArticleList from "../components/ArticleList";
import Layout from "../components/layout";

const Writing = ({ data }) => {
  const { _heading, online, print } = data.aboutJson.technicalWriting
  return (
    <Layout>
      <h1>{_heading}</h1>
      <h2>{online._heading}</h2>
      <ArticleList list={online._list} reverseOrder={true} />
      <h2>{print._heading}</h2>
      <ArticleList list={print._list} />
    </Layout>
  )
}

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
`

export default Writing
