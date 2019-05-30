import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth';
import ConfirmRegistration from './component';
import { withLoadingNames } from '../../context/loading-names';

export default compose(
  withRouter,
  withLoadingNames,
  withAuth
)(ConfirmRegistration);
