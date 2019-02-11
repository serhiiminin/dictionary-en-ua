import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import HeaderNavigation from './component';
import { withUser } from '../../context/user';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withUser
);

export default enhance(HeaderNavigation);
