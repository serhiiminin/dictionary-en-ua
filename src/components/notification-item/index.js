import injectSheet from 'react-jss';
import { compose } from 'recompose';
import styles from './styles';
import NotificationItem from './component';

const enhance = compose(
  injectSheet(styles),
);

export default enhance(NotificationItem);
