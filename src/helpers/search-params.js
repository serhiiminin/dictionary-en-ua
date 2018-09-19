const joinSearchParams = params => {
  const searchParams = new URLSearchParams('');

  Object.entries(params)
    .forEach(param => searchParams.append(...param));
  return searchParams.toString();
};

const parseSearchParams = searchString => {
  const searchParams = new URLSearchParams(searchString);

  return Object.assign(
    {},
    ...Array.from(searchParams.entries())
      .map(([key, value]) => ({ [key]: value }))
  );
};

export { joinSearchParams, parseSearchParams };
