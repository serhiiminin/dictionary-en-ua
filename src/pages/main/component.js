import React, { Component } from 'react';
import { Slide } from '@material-ui/core';
import ReactRouterPropTypes from 'react-router-prop-types';
import { joinUrl, mergeSearch } from 'url-joiner';
import { ButtonSearch } from '../../components';
import routes from '../../routes';
import SC from './styles';

class MainContainer extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
  };

  state = {
    searchValue: '',
  };

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
                onChange={this.handleOnChange}
                onKeyUp={this.handleOnEnterPress}
                variant="outlined"
              />
              <ButtonSearch onClick={this.handleOnSearch} disabled={isEmpty} variant="contained" color="primary">
                search
              </ButtonSearch>
            </SC.SearchBlock>
          </SC.SearchBlockWrapper>
        </Slide>
      </SC.MainPage>
    );
  }
}

export default MainContainer;
