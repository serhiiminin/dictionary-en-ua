import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withLoadingNames } from '../../context/loading-names';
import { withWords } from '../../context/words';
import WordsList from './component';
import styles from './styles';

const enhance = compose(
  withLoadingNames,
  withWords,
  injectSheet(styles),
);

export default enhance(WordsList);
