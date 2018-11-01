import { compose } from 'recompose';
import { withNotifications } from '../../context/notifications';
import Notifications from './component';

const enhance = compose(
  withNotifications
);

export default enhance(Notifications);
