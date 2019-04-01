import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../../context/auth';
import { withLoadingNames } from '../../../context/loading-names';
import { withErrors } from '../../../context/errors';
import LoginCmp from './container';

const Login = compose(
  withTheme,
  withRouter,
  withLoadingNames,
  withAuth,
  withErrors
)(LoginCmp);

export default Login;
