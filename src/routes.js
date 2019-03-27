const words = '/words';

const routes = {
  root: '/',
  auth: {
    logIn: '/log-in',
    logOut: '/log-out',
    signUp: '/sign-up',
  },
  words: {
    root: words,
    add: `${words}/add`,
    edit: `${words}/:id/edit`,
    list: `${words}/list`,
    preview: `${words}/:id`,
    search: `${words}/search`,
  },
};

export default routes;
