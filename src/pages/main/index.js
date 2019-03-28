import { withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import Main from './container';
import styles from './styles';

const enhance = compose(
  withRouter,
  injectSheet(styles)
);

export default enhance(Main);
