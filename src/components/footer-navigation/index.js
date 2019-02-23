import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import FooterNavigation from './component';
import { withAuth } from '../../context/auth';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withAuth
);

export default enhance(FooterNavigation);
