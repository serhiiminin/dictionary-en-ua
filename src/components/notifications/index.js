import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withNotifications } from '../../context/notifications';
import styles from './styles';
import Notifications from './component';

const enhance = compose(
  injectSheet(styles),
  withNotifications
);

export default enhance(Notifications);
