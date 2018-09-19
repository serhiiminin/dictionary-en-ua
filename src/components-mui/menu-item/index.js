import { withStyles } from '@material-ui/core';
import { compose } from 'recompose';
import MenuItem from './component';
import styles from './styles';

const enhance = compose(
  withStyles(styles),
);

export default enhance(MenuItem);
