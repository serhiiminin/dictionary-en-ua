import React, { useState } from 'react';
import { Slide } from '@material-ui/core';
import ReactRouterPropTypes from 'react-router-prop-types';
import { joinUrl, mergeSearch } from 'url-joiner';
import { ButtonSearch } from '../../components';
import routes from '../../routes';
import SC from './styles';

const MainContainer = ({ history }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleOnChange = event => setSearchValue(event.target.value);

  const handleOnSearch = () => history.push(joinUrl(routes.words.search, mergeSearch({ query: searchValue })));

  const handleOnEnterPress = event => {
    const key = event.key || event.keyCode;

    if (key === 'Enter' || key === 13) {
      handleOnSearch();
    }
  };

  return (
    <SC.MainPage>
      <Slide in direction="right">
        <SC.SearchBlockWrapper>
          <SC.PageTitle>
            The Best Dictionary ever.
            <SC.BoldText>TRY IT!</SC.BoldText>
          </SC.PageTitle>
          <SC.SearchBlock>
            <SC.TextField
              label="your word"
              value={searchValue}
              onChange={handleOnChange}
              onKeyUp={handleOnEnterPress}
              variant="outlined"
            />
            <ButtonSearch onClick={handleOnSearch} disabled={!searchValue} variant="contained" color="primary">
              search
            </ButtonSearch>
          </SC.SearchBlock>
        </SC.SearchBlockWrapper>
      </Slide>
    </SC.MainPage>
  );
};

MainContainer.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default MainContainer;
