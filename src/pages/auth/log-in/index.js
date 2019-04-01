import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../../context/auth';
import { withLoadingNames } from '../../../context/loading-names';
import LoginCmp from './container';
import styles from './styles';
import { withErrors } from '../../../context/errors';

const Login = compose(
  withTheme(styles),
  withRouter,
  withLoadingNames,
  withAuth,
  withErrors
)(LoginCmp);

export default Login;
