import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface Params {
  location: string;
}

interface OwnProps {
  condition: boolean;
  pathname: string;
  component: JSX.Element;
  render(params: Params): JSX.Element;
}

type Props = RouteProps & OwnProps;

const PrivateRoute = ({ condition, pathname, component: Cmp, render, ...rest }: Props): JSX.Element => (
  <Route
    {...rest}
    render={(params: Params): JSX.Element => {
      if (condition) {
        return (
          <Redirect
            to={{
              pathname,
              redirectedFrom: params.location,
            }}
          />
        );
      }

      return render ? render(params) : Cmp && <Cmp {...params} />;
    }}
  />
);

PrivateRoute.defaultProps = {
  component: null,
  render: null,
};

export default PrivateRoute;
