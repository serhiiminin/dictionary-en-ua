import React, { Component, createContext } from "react";
import PropTypes from "prop-types";

const TokensContext = createContext({});

class TokensProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    googleToken: JSON.parse(window.localStorage.getItem("google")),
    isLoggedIn: !!(JSON.parse(window.localStorage.getItem("google"))),
  };

  componentWillUnmount() {
    this.cleanGoogleToken();
  }

  setGoogleToken = tokenData => {
    if (tokenData) {
      this.setState({
        googleToken: tokenData,
        isLoggedIn: true
      });
      window.localStorage.setItem("google", JSON.stringify(tokenData));
    }
  };

  cleanGoogleToken = () => {
    this.setState({
      googleToken: null,
      isLoggedIn: false
    });
    window.localStorage.clear("google");
  };

  render() {
    const { googleToken, isLoggedIn } = this.state;
    const { children } = this.props;
      
    return (
      <TokensContext.Provider
        value={{
          googleToken,
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
