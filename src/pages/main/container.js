import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button } from '@material-ui/core';
import { joinRoute } from 'url-joiner';
import { ControlsSeparator, TextField } from '../../components-new';
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
      <main>
        <h1 className={classes.pageTitle}>It&#39;s English time</h1>
        <div className={classes.searchBlock}>
          <ControlsSeparator align="center">
            <TextField
              label="Search a word"
              value={searchValue}
              onChange={this.handleOnChange}
              onKeyUp={this.handleOnEnterPress}
            />
            <Button onClick={this.handleOnSearch} disabled={isEmpty} variant="contained" color="primary">
              Search
            </Button>
          </ControlsSeparator>
        </div>
      </main>
    );
  }
}

export default MainContainer;
