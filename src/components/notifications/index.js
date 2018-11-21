import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withNotifications } from '../../context/notifications';
import Notifications from './component';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withNotifications
);

export default enhance(Notifications);
