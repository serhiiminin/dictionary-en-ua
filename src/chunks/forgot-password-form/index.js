import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth';
import { withErrors } from '../../context/errors';
import { withLoading } from '../../context/loading';
import ForgotPasswordCmp from './component';

const ForgotPassword = compose(
  withRouter,
  withAuth,
  withErrors,
  withLoading,
  withTheme
)(ForgotPasswordCmp);

export default ForgotPassword;
