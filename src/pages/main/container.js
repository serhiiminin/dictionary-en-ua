import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { joinUrl, mergeSearch } from 'url-joiner';
import { ButtonSearch } from '../../components-new';
import routes from '../../routes';
import SC from './styles';

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
      <SC.MainPage>
        <SC.PageTitle>It&#39;s English time</SC.PageTitle>
        <SC.SearchBlock>
          <SC.TextField
            label="Search a word"
            value={searchValue}
            onChange={this.handleOnChange}
            onKeyUp={this.handleOnEnterPress}
            variant="outlined"
          />
          <ButtonSearch onClick={this.handleOnSearch} disabled={isEmpty} variant="contained" color="primary">
            Search
          </ButtonSearch>
        </SC.SearchBlock>
        <SC.MainDecorSvg />
      </SC.MainPage>
    );
  }
}

export default MainContainer;
