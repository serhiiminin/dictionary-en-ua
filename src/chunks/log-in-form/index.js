import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth';
import { withErrors } from '../../context/errors';
import { withLoading } from '../../context/loading';
import LogInCmp from './component';

const LogIn = compose(
  withRouter,
  withAuth,
  withErrors,
  withLoading,
  withTheme
)(LogInCmp);

export default LogIn;
