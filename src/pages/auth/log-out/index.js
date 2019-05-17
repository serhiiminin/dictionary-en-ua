import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withAuth } from '../../../context/auth';
import LoginCmp from './component';

const Login = compose(
  withAuth,
  withTheme
)(LoginCmp);

export default Login;
