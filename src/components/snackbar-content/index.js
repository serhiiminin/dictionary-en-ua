import { compose } from 'recompose';
import injectSheet from 'react-jss';
import Snackbar from './component';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
);

export default enhance(Snackbar);
