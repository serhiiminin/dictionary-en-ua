import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { joinRoute } from 'url-joiner';
import { Button, ControlsSeparator, TextFieldLoading } from '../../components';
import loadingNames from '../../constants/loading-names';
import routes from '../../routes';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

class MainContainer extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
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
    const { checkIsLoading, classes } = this.props;
    const isEmpty = !searchValue;
    const loading = checkIsLoading(loadingNames.words.search);

    return (
      <main>
        <h1 className={classes.pageTitle}>It&#39;s English time</h1>
        <div className={classes.searchBlock}>
          <ControlsSeparator align="center">
            <TextFieldLoading
              label="Search a word"
              value={searchValue}
              onChange={this.handleOnChange}
              loading={loading}
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
