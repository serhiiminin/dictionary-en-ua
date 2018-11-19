import React, { Component, createContext } from "react";
import PropTypes from "prop-types";

const TokensContext = createContext({});

class TokensProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    tokens: {},
    isLoggedIn: false,
  };

  componentDidMount() {
    Promise.resolve(JSON.parse(window.localStorage.getItem("google")))
      .then(this.setGoogleToken)
  }

  getGoogleToken = () => this.state.tokens.google;

  setGoogleToken = tokenData => {
    if (tokenData) {
      return Promise.resolve(
        this.setState(prevState => ({
          tokens: {
            ...prevState.tokens,
            google: tokenData
          },
          isLoggedIn: true,
        }))
      )
      .then(() => window.localStorage.setItem("google", JSON.stringify(tokenData)));
    }
    return null;
  };

  cleanGoogleToken = () => {
    this.setState(prevState => ({
      tokens: {
        ...prevState.tokens,
        google: null
      },
      isLoggedIn: false,
    }));
  };

  render() {
    const { tokens, isLoggedIn } = this.state;
    const { children } = this.props;

    return (
      <TokensContext.Provider
        value={{
          tokens,
          isUserLoggedIn: isLoggedIn,
          getGoogleToken: this.getGoogleToken,
          setGoogleToken: this.setGoogleToken,
          cleanGoogleToken: this.cleanGoogleToken
        }}
      >
        {children}
      </TokensContext.Provider>
    );
  }
}

const withTokens = Cmp => props => (
  <TokensContext.Consumer>
    {value => <Cmp {...value} {...props} />}
  </TokensContext.Consumer>
);

export { TokensProvider, withTokens };
