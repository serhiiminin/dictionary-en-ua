import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import { withUser } from '../../context/user';
import styles from './styles';
import UserIcon from './component';

const enhance = compose(
  withTheme(styles),
  withUser
);

export default enhance(UserIcon);
