import injectSheet from 'react-jss';
import { compose } from 'recompose';
import HeaderNavigation from './component';
import { withTokens } from '../../context/tokens';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withTokens,
);

export default enhance(HeaderNavigation);
