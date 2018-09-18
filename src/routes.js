const routes = {
  root: '/',
  login: '/login',
  words: {
    add: '/add-word',
    learn: '/learn-words',
    list: {
      root: '/words-list',
      preview: '/words-list/:id',
      edit: '/words-list/:id/edit',
    },
    search: '/words-search',
  },
};

export default routes;
