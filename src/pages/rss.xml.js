import rss from '@astrojs/rss';

const postImports = import.meta.glob('./blog/**/*.{md,mdx}', {
  eager: true,
});
const posts = Object.values(postImports).sort(
  (a, b) =>
    new Date(b.frontmatter.publishDate).valueOf() -
    new Date(a.frontmatter.publishDate).valueOf()
);

export function GET(context) {
  return rss({
    // `<title>` field in output xml
    title: `Dominik Kundel's Blog`,
    // `<description>` field in output xml
    description:
      'Articles about coding, product management, and more, written by Dominik Kundel',
    // base URL for RSS <item> links
    // SITE will use "site" from your project's astro.config.
    site: context.site,
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    items: posts.map(post => {
      return {
        link: post.url,
        title: post.frontmatter.title,
        pubDate: post.frontmatter.publishDate,
        description: post.frontmatter.excerpt,
      };
    }),
    stylesheet: '/pretty-feed-v3.xsl',
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
