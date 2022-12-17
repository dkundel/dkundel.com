export default async request => {
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get('url');
  const response = fetch(imageUrl);

  return response;
};
