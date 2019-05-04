import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Fade } from '@material-ui/core';
import { Switch, Route, withRouter } from 'react-router-dom';
import LogOutContainer from './log-out';
import { WidgetLogin, WidgetSignUp, SignUp, LogIn } from '../../components';
import routes from '../../routes';
import SC from './styles';

const SLIDING_TIME = 500;

class AuthPage extends Component {
  state = {
    isSliding: false,
  };

  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ isSliding: true });

      setTimeout(() => {
        this.setState({ isSliding: false });
      }, SLIDING_TIME);
    }
  }

  render() {
    const { isSliding } = this.state;
    const isLeftActive = [routes.auth.logIn].includes(this.props.location.pathname);
    const isRightActive = [routes.auth.signUp].includes(this.props.location.pathname);

    return (
      <Switch>
        <Route path={routes.auth.logOut} component={LogOutContainer} />
        <SC.Outer>
          <SC.Background isLeft={isLeftActive} transitionDelay={SLIDING_TIME} />
          <SC.Circle transitionDelay={SLIDING_TIME} isLeft={isLeftActive} />
          <SC.HalfPart isActive={isLeftActive}>
            {!isSliding && (
              <Fade in={!isSliding}>
                <Switch>
                  <Route path={routes.auth.logIn} component={LogIn} />
                  <Route path={routes.auth.signUp} component={WidgetLogin} />
                </Switch>
              </Fade>
            )}
          </SC.HalfPart>
          <SC.HalfPart isActive={isRightActive}>
            {!isSliding && (
              <Fade in={!isSliding}>
                <Switch>
                  <Route path={routes.auth.logIn} component={WidgetSignUp} />
                  <Route path={routes.auth.signUp} component={SignUp} />
                </Switch>
              </Fade>
            )}
          </SC.HalfPart>
        </SC.Outer>
      </Switch>
    );
  }
}

export default withRouter(AuthPage);
