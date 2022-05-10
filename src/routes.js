const routes = {
  storiesPath: () => 'https://hacker-news.firebaseio.com/v0/topstories.json',
  itemPath: (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  homePath: () => '/',
  postPath: (id) => `/post/${id}`,
};

export default routes;
