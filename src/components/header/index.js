import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withTokens } from '../../context/tokens';
import styles from './styles';
import Header from './component';

const enhance = compose(
  injectSheet(styles),
  withTokens
);

export default enhance(Header);
