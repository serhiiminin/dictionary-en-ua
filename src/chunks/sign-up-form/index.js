import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth';
import { withErrors } from '../../context/errors';
import SignUpCmp from './container';
import { withLoadingNames } from '../../context/loading-names';

const SignUp = compose(
  withRouter,
  withAuth,
  withLoadingNames,
  withErrors,
  withTheme
)(SignUpCmp);

export default SignUp;
