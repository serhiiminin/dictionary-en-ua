import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { withSnackbar } from 'notistack';
import { withLoadingNames } from '../../context/loading-names';
import LearnWords from './container';
import styles from './styles';
import { withWords } from '../../context/words';

const enhance = compose(
  injectSheet(styles),
  withLoadingNames,
  withSnackbar,
  withWords
);

export default enhance(LearnWords);
