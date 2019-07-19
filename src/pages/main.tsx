import React from 'react';
import { Link } from 'react-router-dom';
import { Slide, TextField as MuiTextField } from '@material-ui/core';
import styled from 'styled-components';
import { BlockSearch, ButtonSearch } from '../components';
import { ThemeProps } from '../types';

const MainPageWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 24rem;
`;

const SearchBlockWrapper = styled.div`
  width: 54rem;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.lg};
  letter-spacing: ${(props: ThemeProps): string => props.theme.main.letterSpacing.xs};
  font-weight: normal;
  margin: 0;
`;
const BoldText = styled.span`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.xl};
  font-family: ${(props: ThemeProps): string => props.theme.main.fontFamily.cairoBold};
  letter-spacing: ${(props: ThemeProps): string => props.theme.main.letterSpacing.xs};
`;

const SearchBlock = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${(props: ThemeProps): string => props.theme.main.space.xl};
  align-items: center;
  margin-top: ${(props: ThemeProps): string => props.theme.main.space.md};
`;
const TextField = styled((props): JSX.Element => <MuiTextField {...props} />)`
  && {
    width: 35rem;
  }
`;

const Main = (): JSX.Element => (
  <MainPageWrapper>
    <Slide in direction="right">
      <SearchBlockWrapper>
        <PageTitle>
          The Best Dictionary ever.
          <BoldText>TRY IT!</BoldText>
        </PageTitle>
        <BlockSearch>
          {({ searchValue, linkTo, handleOnEnterPress, handleOnChange }): JSX.Element => (
            <SearchBlock>
              <TextField
                label="your word"
                value={searchValue}
                onChange={handleOnChange}
                onKeyUp={handleOnEnterPress}
                variant="outlined"
              />
              <ButtonSearch component={Link} to={linkTo} disabled={!searchValue} variant="contained" color="primary">
                search
              </ButtonSearch>
            </SearchBlock>
          )}
        </BlockSearch>
      </SearchBlockWrapper>
    </Slide>
  </MainPageWrapper>
);

export default Main;
