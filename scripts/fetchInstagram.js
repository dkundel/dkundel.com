const got = require('got');

function parseEdge({ node }) {
  const { thumbnail_resources, display_url, shortcode } = node;
  return {
    thumbnail:
      '/api/ig?url=' +
      encodeURIComponent(
        thumbnail_resources[thumbnail_resources.length - 1].src
      ),
    image: '/api/ig?url=' + encodeURIComponent(display_url),
    id: shortcode,
    url: `https://www.instagram.com/p/${shortcode}/`,
  };
}

const fetchInstagram = async () => {
  const variables = encodeURIComponent(
    JSON.stringify({
      id: '32317212119',
      first: 12,
    })
  );
  const response = await got(
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
  const { data } = JSON.parse(response.body);
  // console.log(response.body);
  const responseData = {
    feed: data.user.edge_owner_to_timeline_media.edges.map(parseEdge),
  };

  return responseData;
};

module.exports = { fetchInstagram };
