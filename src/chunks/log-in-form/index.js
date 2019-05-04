import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth';
import { withErrors } from '../../context/errors';
import LogInCmp from './container';

const LogIn = compose(
  withRouter,
  withAuth,
  withErrors,
  withTheme
)(LogInCmp);

export default LogIn;
