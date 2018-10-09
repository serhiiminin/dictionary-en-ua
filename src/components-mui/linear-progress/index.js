import { withStyles } from '@material-ui/core';
import { compose } from 'recompose';
import LinearProgressCustomized from './component';
import styles from './styles';

const enhance = compose(
  withStyles(styles),
);

export default enhance(LinearProgressCustomized);
