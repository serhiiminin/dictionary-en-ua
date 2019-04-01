import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { joinUrl, mergeSearch } from 'url-joiner';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { ButtonSearch } from '../../components-new';
import routes from '../../routes';

const StyledMainPage = styled.div`
  display: grid;
  justify-content: center;
  padding-top: 230px;
`;
const StyledPageTitle = styled.h1`
  font-size: 30px;
  letter-spacing: 2px;
`;
const StyledSearchBlock = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 30px;
  align-items: center;
`;
const StyledTextField = styled(TextField)`
  width: 350px;
`;

class MainContainer extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
  };

  state = {
    searchValue: '',
  };

  cleanSearchValue = () => this.setState({ searchValue: '' });

  handleOnChange = event => {
    const { value } = event.target;

    this.setState({ searchValue: value });
  };

  handleOnSearch = () => {
    const { searchValue } = this.state;
    const { history } = this.props;

    history.push(joinUrl(routes.words.search, mergeSearch({ query: searchValue })));
  };

  handleOnEnterPress = event => {
    const key = event.key || event.keyCode;

    if (key === 'Enter' || key === 13) {
      this.handleOnSearch();
    }
  };

  render() {
    const { searchValue } = this.state;
    const isEmpty = !searchValue;

    return (
      <StyledMainPage>
        <StyledPageTitle>It&#39;s English time</StyledPageTitle>
        <StyledSearchBlock>
          <StyledTextField
            label="Search a word"
            value={searchValue}
            onChange={this.handleOnChange}
            onKeyUp={this.handleOnEnterPress}
            variant="outlined"
          />
          <ButtonSearch onClick={this.handleOnSearch} disabled={isEmpty} variant="contained" color="primary">
            Search
          </ButtonSearch>
        </StyledSearchBlock>
      </StyledMainPage>
    );
  }
}

export default MainContainer;
