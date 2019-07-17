import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { withRouter, Link, LinkProps, RouteComponentProps } from 'react-router-dom';

type Props = RouteComponentProps & LinkProps & ButtonProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ButtonWithRouter = ({ location, history, match, to, staticContext, ...props }: Props): JSX.Element =>
  to ? (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Button {...({ to } as any)} color="primary" component={Link} disabled={location.pathname === to} {...props} />
  ) : (
    <Button {...props} />
  );

export default withRouter(ButtonWithRouter);
