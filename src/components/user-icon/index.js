import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withUser } from '../../context/user';
import styles from './styles';
import UserIcon from './component';

const enhance = compose(
  injectSheet(styles),
  withUser,
);

export default enhance(UserIcon);
