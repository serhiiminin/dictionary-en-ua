import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth';
import { withErrors } from '../../context/errors';
import SignUpCmp from './component';
import { withLoading } from '../../context/loading';

const SignUp = compose(
  withRouter,
  withAuth,
  withLoading,
  withErrors
)(SignUpCmp);

export default SignUp;
