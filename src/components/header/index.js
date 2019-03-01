import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withAuth } from '../../context/auth';
import { withLoadingNames } from '../../context/loading-names';
import styles from './styles';
import Header from './component';

const enhance = compose(
  injectSheet(styles),
  withLoadingNames,
  withAuth
);

export default enhance(Header);
