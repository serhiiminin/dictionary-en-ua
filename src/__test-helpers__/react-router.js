const mockRouterProps = {
  match: {
    isExact: true,
    params: {},
    path: '',
    url: '',
  },
  location: {
    hash: '',
    key: '',
    pathname: '',
    search: '',
    state: {},
  },
  history: {
    length: 2,
    action: 'POP',
    location: location,
    push: () => {},
    replace: () => {},
    go: () => {},
    goBack: () => {},
    goForward: () => {},
    block: () => {},
    createHref: () => {},
    listen: () => {},
  },
  staticContext: {},
};

export default mockRouterProps;
