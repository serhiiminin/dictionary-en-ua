import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { joinRoute } from 'url-joiner';
import { TextField } from '@material-ui/core';
import { ButtonSearch } from '../../components-new';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import routes from '../../routes';
import styles from './styles';

class MainContainer extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    classes: composeClassesPropTypes(styles),
  };

  static defaultProps = {
    classes: {},
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

    history.push(joinRoute({ pathname: routes.words.search, searchParams: { query: searchValue } }));
  };

  handleOnEnterPress = event => {
    const key = event.key || event.keyCode;

    if (key === 'Enter' || key === 13) {
      this.handleOnSearch();
    }
  };

  render() {
    const { searchValue } = this.state;
    const { classes } = this.props;
    const isEmpty = !searchValue;

    return (
      <main className={classes.mainPage}>
        <h1 className={classes.pageTitle}>It&#39;s English time</h1>
        <div className={classes.searchBlock}>
          <TextField
            label="Search a word"
            value={searchValue}
            className={classes.searchInput}
            onChange={this.handleOnChange}
            onKeyUp={this.handleOnEnterPress}
            variant="outlined"
          />
          <ButtonSearch onClick={this.handleOnSearch} disabled={isEmpty} variant="contained" color="primary">
            Search
          </ButtonSearch>
        </div>
      </main>
    );
  }
}

export default MainContainer;
