import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withTokens } from '../../context/tokens';
import { withUser } from '../../context/user';
import styles from './styles';
import UserIcon from './component';

const enhance = compose(
  injectSheet(styles),
  withTokens,
  withUser,
);

export default enhance(UserIcon);
