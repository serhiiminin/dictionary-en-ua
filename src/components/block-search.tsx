import { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { joinUrl, mergeSearch, parseSearch } from 'url-joiner';
import routes from '../routes';

interface OwnProps {
  children(props: {
    linkTo: string;
    searchValue: string;
    handleOnChange: Function;
    handleOnEnterPress: Function;
  }): JSX.Element;
}

type Props = RouteComponentProps & OwnProps;

const BlockSearch = ({ history, location, children }: Props): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect((): void => {
    const { query = '' } = parseSearch(location.search);
    setSearchValue(query);
  }, [location.search]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleOnSearch = (): void => {
    history.push(joinUrl(routes.words.search, mergeSearch({ query: searchValue })));
  };

  const handleOnEnterPress = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
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

export default withRouter(BlockSearch);
