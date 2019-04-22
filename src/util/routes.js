const generateRoute = (route = '', params = {}) =>
  Object.entries(params).reduce((acc, [key, value]) => acc.replace(`:${key}`, value), route);

export default generateRoute;
