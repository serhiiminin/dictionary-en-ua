import { useState, useEffect, useContext } from 'react';
import { joinUrl, mergeSearch } from 'url-joiner';
import routes from '../routes';
import { SearchParamsContext } from '../context/search-params';

interface Props {
  children(props: {
    linkTo: string;
    searchValue: string;
    handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void;
    handleOnEnterPress(event: React.KeyboardEvent<HTMLDivElement>): void;
  }): JSX.Element;
}

const BlockSearch = ({ children }: Props): JSX.Element => {
  const { setNewSearchParams, searchParams } = useContext(SearchParamsContext);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect((): void => {
    setSearchValue(searchParams.query || '');
  }, [searchParams.query]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleOnSearch = (): void => {
    setNewSearchParams(routes.words.search, { query: searchValue });
  };

  const handleOnEnterPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const key = event.key || event.keyCode;

    if (key === 'Enter' || key === 13) {
      handleOnSearch();
    }
  };
  const linkTo = joinUrl(routes.words.search, mergeSearch({ query: searchValue }));

  return children({
    linkTo,
    searchValue,
    handleOnChange,
    handleOnEnterPress,
  });
};

export default BlockSearch;
