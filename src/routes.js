const routes = {
  storiesPath: () => 'https://hacker-news.firebaseio.com/v0/topstories.json',
  itemPath: (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  homePath: () => '/',
  newsPath: (id) => `/${id}`,
};

export default routes;
