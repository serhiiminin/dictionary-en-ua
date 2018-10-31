import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withEditingWord } from '../../context/editing-word';
import { withFoundWord } from '../../context/found-word';
import { withLoadingNames } from '../../context/loading-names';
import { withWords } from '../../context/words';
import SearchWord from './container';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withLoadingNames,
  withWords,
  withFoundWord,
  withEditingWord,
);

export default enhance(SearchWord);
