import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withLoadingNames } from '../../context/loading-names';
import { withWords } from '../../context/words';
import WordsTable from './component';
import styles from './styles';

const enhance = compose(
  withTheme(styles),
  withRouter,
  withLoadingNames,
  withWords
);

export default enhance(WordsTable);
