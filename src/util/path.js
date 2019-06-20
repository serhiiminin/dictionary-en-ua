const generatePath = (path, params) =>
  Object.entries(params).reduce((acc, [key, value]) => acc.replace(`:${key}`, value), path);

export { generatePath };
