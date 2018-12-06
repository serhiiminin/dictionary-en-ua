import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withLoadingNames } from '../../context/loading-names';
import { withUser } from '../../context/user';
import styles from './styles';
import Header from './component';

const enhance = compose(
  injectSheet(styles),
  withLoadingNames,
  withUser
);

export default enhance(Header);
