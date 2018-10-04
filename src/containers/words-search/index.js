import { withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withFoundWord } from '../../context/found-word';
import { withLoadingNames } from '../../context/loading-names';
import { withWordForm } from '../../context/word-form';
import { withWords } from '../../context/words';
import styles from './styles';
import SearchWord from './component';

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withLoadingNames,
  withWords,
  withFoundWord,
  withWordForm,
);

export default enhance(SearchWord);
