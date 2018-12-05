import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withUser } from '../../context/user';
import styles from './styles';
import Header from './component';

const enhance = compose(
  injectSheet(styles),
  withUser
);

export default enhance(Header);
