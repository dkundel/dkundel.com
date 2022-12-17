function parseEdge({ node }) {
  const { thumbnail_resources, display_url, shortcode } = node;
  return {
    thumbnail: thumbnail_resources[thumbnail_resources.length - 1].src,
    image: display_url,
    url: `https://www.instagram.com/p/${shortcode}/`,
  };
}

export default async () => {
  const variables = encodeURIComponent(
    JSON.stringify({
      id: '32317212119',
      first: 12,
    })
  );
  const response = await fetch(
    `https://www.instagram.com/graphql/query/?query_hash=69cba40317214236af40e7efa697781d&variables=${variables}`,
    {
      headers: {
        accept: '*/*',
        // 'x-asbd-id': '198387',
        // 'x-ig-app-id': '936619743392459',
      },
      body: null,
      method: 'GET',
    }
  );
  const { data } = await response.json();
  const responseData = {
    data,
    feed: data.user.edge_owner_to_timeline_media.edges.map(parseEdge),
  };

  return new Response(JSON.stringify(responseData), {
    headers: { 'content-type': 'application/json' },
  });
};
