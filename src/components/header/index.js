import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import { withAuth } from '../../context/auth';
import { withLoadingNames } from '../../context/loading-names';
import styles from './styles';
import Header from './component';

const enhance = compose(
  withTheme(styles),
  withLoadingNames,
  withAuth
);

export default enhance(Header);
