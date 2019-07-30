import { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { joinUrl, mergeSearch } from 'url-joiner';
import routes from '../routes';
import { withSearchParams, SI } from '../context/search-params';

interface OwnProps {
  children(props: {
    linkTo: string;
    searchValue: string;
    handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void;
    handleOnEnterPress(event: React.KeyboardEvent<HTMLDivElement>): void;
  }): JSX.Element;
}

type Props = SI & OwnProps;

const BlockSearch = ({ setNewSearchParams, searchParams, children }: Props): JSX.Element => {
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

export default compose<Props, OwnProps>(withSearchParams)(BlockSearch);
