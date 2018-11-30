import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import HeaderNavigation from './component';
import { withTokens } from '../../context/tokens';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withTokens,
);

export default enhance(HeaderNavigation);
