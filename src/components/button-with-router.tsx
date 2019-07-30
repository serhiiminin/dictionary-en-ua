import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { Link, LinkProps } from 'react-router-dom';

type Props = LinkProps & ButtonProps;

const ButtonWithRouter = ({ to, ...props }: Props): JSX.Element =>
  to ? (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Button {...({ to } as any)} color="primary" component={Link} {...props} />
  ) : (
    <Button {...props} />
  );

export default ButtonWithRouter;
