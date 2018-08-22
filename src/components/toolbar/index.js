import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import ToolbarCmp from './component';

const enhance = compose(
  withStyles(styles),
);

export default enhance(ToolbarCmp);
