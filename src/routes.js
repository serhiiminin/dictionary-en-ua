const routes = {
  root: '/',
  login: '/login',
  logout: '/logout',
  signup: '/signup',
  words: {
    add: '/add-word',
    learn: '/learn-words',
    list: {
      root: '/words-list',
      all: '/words-list/all',
      preview: '/words-list/:id',
      edit: '/words-list/:id/edit',
    },
    search: '/search-words',
  },
};

export default routes;
