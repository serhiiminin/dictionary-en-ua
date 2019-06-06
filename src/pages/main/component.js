import React from 'react';
import { Slide } from '@material-ui/core';
import { BlockSearch, ButtonSearch } from '../../components';
import SC from './styles';

const MainContainer = () => (
  <SC.MainPage>
    <Slide in direction="right">
      <SC.SearchBlockWrapper>
        <SC.PageTitle>
          The Best Dictionary ever.
          <SC.BoldText>TRY IT!</SC.BoldText>
        </SC.PageTitle>
        <BlockSearch>
          {({ searchValue, linkTo, handleOnEnterPress, handleOnChange }) => (
            <SC.SearchBlock>
              <SC.TextField
                label="your word"
                value={searchValue}
                onChange={handleOnChange}
                onKeyUp={handleOnEnterPress}
                variant="outlined"
              />
              <ButtonSearch to={linkTo} disabled={!searchValue} variant="contained" color="primary">
                search
              </ButtonSearch>
            </SC.SearchBlock>
          )}
        </BlockSearch>
      </SC.SearchBlockWrapper>
    </Slide>
  </SC.MainPage>
);

export default MainContainer;
