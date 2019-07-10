import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { Link, LinkProps, RouteComponentProps } from 'react-router-dom';

type Props = LinkProps & RouteComponentProps & ButtonProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ButtonWithRouter = ({ location, history, match, to, staticContext, ...props }: Props): JSX.Element =>
  to ? (
    <Button to={to} color="primary" component={Link} disabled={location.pathname === to} {...props} />
  ) : (
    <Button {...props} />
  );

export default ButtonWithRouter;
