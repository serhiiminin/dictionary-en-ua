import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../../context/auth';
import LoginCmp from './container';
import styles from './styles';
import { withErrors } from '../../../context/errors';

const Signup = compose(
  withTheme(styles),
  withRouter,
  withAuth,
  withErrors
)(LoginCmp);

export default Signup;
