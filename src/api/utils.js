const URL_DELIMITER = '/';

const joinUrl = (...urlParts) => {
  const [first, ...rest] = urlParts.map(part => (part == null ? '' : part.toString()));
  const last = rest.pop();

  return [
    first !== undefined && first.trim(),
    ...rest.map(str => str.trim()),
    last !== undefined && last.trim(),
  ].filter(a => a !== false).join(URL_DELIMITER);
};

export { joinUrl };
