import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { withLoadingNames } from '../../context/loading-names';
import { withWords } from '../../context/words';
import Table from './component';
import styles from './styles';

const enhance = compose(
  withStyles(styles),
  withLoadingNames,
  withWords,
);

export default enhance(Table);
