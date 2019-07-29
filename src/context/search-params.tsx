import React, { ComponentType, createContext, useState, useEffect } from 'react';
import { parseSearch, mergeSearch, joinUrl } from 'url-joiner';
import { compose } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { QueryParams, SearchParams } from '../types';

const { Provider, Consumer } = createContext({});

const INITIAL_SORT_DATA = {
  sortBy: 'created',
  sortDirection: 'descend',
  page: 1,
  countPerPage: 5,
};

const getWordsSearchParams = (search: string): SearchParams => {
  const { sortBy, sortDirection, page, countPerPage, filter, ...rest } = parseSearch(search);

  return {
    sortBy: sortBy || INITIAL_SORT_DATA.sortBy,
    sortDirection: sortDirection || INITIAL_SORT_DATA.sortDirection,
    page: Number(page) || INITIAL_SORT_DATA.page,
    countPerPage: Number(countPerPage) || INITIAL_SORT_DATA.countPerPage,
    filter: filter || '',
    ...rest,
  };
};

const generateQuery = ({ page, countPerPage, sortDirection, sortBy, filter }: SearchParams): QueryParams => ({
  skip: (page - 1) * countPerPage,
  limit: Number(countPerPage),
  sortDirection: sortDirection === 'descend' ? -1 : 1,
  sortBy,
  filter,
});

interface OwnProps {
  children: JSX.Element;
}

type Props = RouteComponentProps & OwnProps;

const SearchParamsProviderCmp = ({ children, location, history }: Props): JSX.Element => {
  const params = getWordsSearchParams(location.search);
  const [searchParams, setSearchParams] = useState<SearchParams>(params);
  const [query, setQuery] = useState<QueryParams>(generateQuery(params));

  useEffect((): void => {
    const p = getWordsSearchParams(location.search);
    setSearchParams(p);
    setQuery(generateQuery(p));
  }, [location.search]);

  const setNewSearchParams = (path: string, newParams: object): void => {
    const updatedUrl = joinUrl(path, mergeSearch(newParams, location.search));
    history.push(updatedUrl);
  };

  return (
    <Provider
      value={{
        query,
        searchParams,
        setNewSearchParams,
      }}
    >
      {children}
    </Provider>
  );
};

const SearchParamsProvider = compose<Props, OwnProps>(withRouter)(SearchParamsProviderCmp);

export interface SI {
  query: QueryParams;
  searchParams: SearchParams;
  setNewSearchParams(path: string, params: object): void;
}

const withSearchParams = <T extends {}>(Cmp: ComponentType<T>): ((props: T & SI) => JSX.Element) => (
  props: T & SI
): JSX.Element => <Consumer>{(context: {}): JSX.Element => <Cmp {...context} {...props} />}</Consumer>;

export { SearchParamsProvider, withSearchParams };
