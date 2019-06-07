import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth';
import { withErrors } from '../../context/errors';
import SignUpCmp from './component';
import { withLoading } from '../../context/loading';

const SignUp = compose(
  withRouter,
  withAuth,
  withLoading,
  withErrors,
  withTheme
)(SignUpCmp);

export default SignUp;
