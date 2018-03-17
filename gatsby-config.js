module.exports = {
  siteMetadata: {
    title: 'Dominik Kundel | Programmer, Developer Evangelist, Public Speaker',
    name: 'Dominik Kundel',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `About`,
        path: `${__dirname}/data/about`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
  ],
};
