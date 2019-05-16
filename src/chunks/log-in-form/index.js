import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth';
import { withErrors } from '../../context/errors';
import { withLoadingNames } from '../../context/loading-names';
import LogInCmp from './container';

const LogIn = compose(
  withRouter,
  withAuth,
  withErrors,
  withLoadingNames,
  withTheme
)(LogInCmp);

export default LogIn;
