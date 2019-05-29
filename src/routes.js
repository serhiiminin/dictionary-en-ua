const auth = '/auth';
const words = '/words';

const routes = {
  root: '/',
  auth: {
    root: auth,
    logIn: `${auth}/log-in`,
    logOut: `${auth}/log-out`,
    signUp: `${auth}/sign-up`,
    confirm: `${auth}/confirm`,
    resetPassword: `${auth}/reset-password`,
    forgotPassword: `${auth}/forgot-password`,
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
