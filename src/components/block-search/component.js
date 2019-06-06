import { useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { joinUrl, mergeSearch, parseSearch } from 'url-joiner';
import routes from '../../routes';

const BlockSearch = ({ history, location, children }) => {
  const { query } = parseSearch(location.search);
  const [searchValue, setSearchValue] = useState(query || '');

  const handleOnChange = event => setSearchValue(event.target.value);

  const handleOnSearch = () => history.push(joinUrl(routes.words.search, mergeSearch({ query: searchValue })));

  const handleOnEnterPress = event => {
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

BlockSearch.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default BlockSearch;
