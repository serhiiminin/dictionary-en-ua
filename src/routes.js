const words = '/words';

const routes = {
  root: '/',
  auth: {
    login: '/login',
    logout: '/logout',
    signup: '/signup',
  },
  words: {
    root: words,
    add: `${words}/add`,
    edit: `${words}/:id/edit`,
    learn: `${words}/learn`,
    list: `${words}/list`,
    preview: `${words}/:id`,
  },
};

export default routes;
