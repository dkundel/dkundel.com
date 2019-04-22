module.exports = {
  siteMetadata: {
    title: "Dominik Kundel | Programmer, Developer Evangelist, Public Speaker",
    description:
      "Dominik Kundel is a Web Developer, Developer Evangelist and Public Speaker. ",
    name: "Dominik Kundel",
    author: `@dkundel`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dominik Kundel | dkundel.com`,
        short_name: `dkundel.com`,
        start_url: `/`,
        background_color: `#f4f7f5`,
        theme_color: `#9ed356`,
        display: `minimal-ui`,
        icon: `src/images/panda-laptop.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
