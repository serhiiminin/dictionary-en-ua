import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../../context/auth';
import { withLoadingNames } from '../../../context/loading-names';
import LoginCmp from './container';
import styles from './styles';
import { withErrors } from '../../../context/errors';

const Login = compose(
  injectSheet(styles),
  withRouter,
  withLoadingNames,
  withAuth,
  withErrors
)(LoginCmp);

export default Login;
