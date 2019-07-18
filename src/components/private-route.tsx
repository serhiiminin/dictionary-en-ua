import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface OwnProps {
  condition: boolean;
  pathname: string;
  component?: React.ComponentType;
  render?(params: RouteComponentProps): JSX.Element;
}

type Props = RouteProps & OwnProps;

const PrivateRoute = ({ condition, pathname, component: Cmp, render, path, ...rest }: Props): JSX.Element => (
  <Route
    {...rest}
    path={path}
    render={(params: RouteComponentProps): React.ReactNode => {
      if (condition) {
        return (
          <Redirect
            to={{
              pathname,
              state: { from: params.location },
            }}
          />
        );
      }

      return render ? render(params) : Cmp && <Cmp {...params} />;
    }}
  />
);

export default PrivateRoute;
