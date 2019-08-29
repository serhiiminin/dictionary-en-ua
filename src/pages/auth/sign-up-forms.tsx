import React, { useEffect, useState } from 'react';
import { withRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';
import { compose } from 'recompose';
import styled, { keyframes } from 'styled-components';
import routes from '../../routes';
import { withAuth, AI } from '../../context/auth';
import {
  TextCircle,
  PrivateRoute,
  ForgotPasswordForm,
  LogInForm,
  LogInSuggestion,
  SignUpForm,
  SignUpSuggestion,
} from '../../components';
import { ThemeProps } from '../../types';

const SMALL_WIDTH = '40%';
const BIG_WIDTH = '60%';
const DEFAULT_SPEED = 12;

const Outer = styled.div`
  width: 100%;
  height: 56rem;
  display: flex;
  margin-top: 10rem;
  flex-flow: row wrap;
  box-shadow: ${(props: ThemeProps): string => props.theme.main.boxShadow.block};
  position: relative;
  border-radius: ${(props: ThemeProps): string => props.theme.main.borderRadius.md};
`;

interface BackgroundProps extends ThemeProps {
  transitionDelay: number;
  isLeft: boolean;
}

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: ${SMALL_WIDTH};
  background: ${(props: ThemeProps): string => props.theme.main.color.gradient.block};
  transition: all ${(props: BackgroundProps): number => props.transitionDelay}ms ease-in-out;
  left: ${(props: BackgroundProps): string => (props.isLeft ? BIG_WIDTH : '0')};
  border-radius: ${(props: ThemeProps): string => props.theme.main.borderRadius.md};
  border-width: 0;
  z-index: 0;
  top: 0;
`;

interface HalfPartProps {
  isActive: boolean;
}

const HalfPart = styled.div`
  width: ${(props: HalfPartProps): string => (props.isActive ? BIG_WIDTH : SMALL_WIDTH)};
  padding: 4rem 7rem;
  position: relative;
  height: 100%;
`;

const rotate = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Circle = styled(({ transitionDelay, isLeft, speed, ...props }): JSX.Element => <TextCircle {...props} />)`
  transition: all ${(props): number => props.transitionDelay}ms ease-in-out;
  animation: ${rotate} ${(props): number => props.speed || DEFAULT_SPEED}s linear infinite;
  transform: translate(-50%, -50%) rotate(0deg);
  position: absolute;
  z-index: 1;
  top: 0;
  left: ${(props): string => (props.isLeft ? BIG_WIDTH : SMALL_WIDTH)};
`;

interface OwnProps {
  path: string;
}

type Props = AI & RouteComponentProps & OwnProps;

const SLIDING_TIME = 500;

const SignUpForms = ({ location }: Props): JSX.Element => {
  const [isSliding, setIsSliding] = useState(false);
  useEffect((): void => {
    setIsSliding(true);
    setTimeout((): void => {
      setIsSliding(false);
    }, SLIDING_TIME);
  }, [location.pathname]);

  const isLeftActive = [routes.auth.logIn].includes(location.pathname);
  const isRightActive = [routes.auth.signUp, routes.auth.forgotPassword].includes(location.pathname);

  return (
    <Outer>
      <Background isLeft={isLeftActive} transitionDelay={SLIDING_TIME} />
      <Circle transitionDelay={SLIDING_TIME} isLeft={isLeftActive} />
      <HalfPart isActive={isLeftActive}>
        {!isSliding && (
          <Switch>
            <Route path={routes.auth.logIn} component={LogInForm} />
            <Route path={routes.auth.signUp} component={LogInSuggestion} />
            <Route path={routes.auth.forgotPassword} component={LogInSuggestion} />
          </Switch>
        )}
      </HalfPart>
      <HalfPart isActive={isRightActive}>
        {!isSliding && (
          <Switch>
            <Route path={routes.auth.logIn} component={SignUpSuggestion} />
            <Route path={routes.auth.signUp} component={SignUpForm} />
            <Route path={routes.auth.forgotPassword} component={ForgotPasswordForm} />
          </Switch>
        )}
      </HalfPart>
    </Outer>
  );
};

const Component = compose<Props, OwnProps>(withRouter)(SignUpForms);

export default compose<Props, OwnProps>(withAuth)(
  ({ isLoggedIn, path }: Props): JSX.Element => (
    <PrivateRoute path={path} component={Component} pathname={routes.auth.logIn} condition={isLoggedIn} />
  )
);
