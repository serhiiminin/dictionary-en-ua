import React, { createContext, useState, useEffect } from 'react';
import { parseSearch, mergeSearch, joinUrl } from 'url-joiner';
import { useHistory, useLocation } from 'react-router-dom';
import { QueryParams, SearchParams } from '../types';

export interface SI {
  query: QueryParams;
  searchParams: SearchParams;
  setNewSearchParams(path: string, params: object): void;
}

const SearchParamsContext = createContext({} as SI);

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

interface Props {
  children: JSX.Element;
}

const SearchParamsProvider = ({ children }: Props): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
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
    <SearchParamsContext.Provider
      value={{
        query,
        searchParams,
        setNewSearchParams,
      }}
    >
      {children}
    </SearchParamsContext.Provider>
  );
};

export { SearchParamsProvider, SearchParamsContext };
