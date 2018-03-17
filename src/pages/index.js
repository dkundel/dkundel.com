import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <pre>{JSON.stringify(data, null, 4)}</pre>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export const query = graphql`
  query AboutMe {
    allAboutJson {
      edges {
        node {
          header: _raw
        }
      }
    }
  }
`

export default IndexPage
