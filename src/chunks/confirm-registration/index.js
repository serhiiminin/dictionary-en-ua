import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth';
import ConfirmRegistration from './component';
import { withLoading } from '../../context/loading';

export default compose(
  withRouter,
  withLoading,
  withAuth
)(ConfirmRegistration);
