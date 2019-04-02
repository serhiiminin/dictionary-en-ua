import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../../context/auth';
import { withLoadingNames } from '../../../context/loading-names';
import { withErrors } from '../../../context/errors';
import LoginCmp from './container';

const Login = compose(
  withRouter,
  withLoadingNames,
  withAuth,
  withErrors,
  withTheme
)(LoginCmp);

export default Login;
