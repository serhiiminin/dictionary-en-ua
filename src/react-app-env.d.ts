// / <reference types="react-scripts" />

declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ReactComponent: any;
  export { ReactComponent };
}

declare module '*.ttf' {
  const content: string;
  export default content;
}

declare module '*.woff' {
  const content: string;
  export default content;
}

declare module '*.woff2' {
  const content: string;
  export default content;
}

declare module '*.eot' {
  const content: string;
  export default content;
}

declare module 'url-joiner' {
  export const joinUrl: (domain: string, search: string) => string;
  export const joinPath: (...allParts: string[]) => string;
  export const mergeSearch: (params: object, currentSearch?: string) => string;
  export const getUrlParts: (url: string) => [string, string];
  export const parseSearch: (
    search: string
  ) => {
    sortBy: string;
    sortDirection: string;
    page: string;
    countPerPage: string;
    query: string;
    filter?: string;
  };
}
