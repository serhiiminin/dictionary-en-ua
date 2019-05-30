import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../context/auth';
import ConfirmRegistration from './component';

export default compose(
  withRouter,
  withAuth
)(ConfirmRegistration);
