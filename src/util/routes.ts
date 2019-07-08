const generateRoute = (route: string = '', params: object = {}): string =>
  Object.entries(params).reduce((acc, [key, value]): string => acc.replace(`:${key}`, value), route);

export default generateRoute;
