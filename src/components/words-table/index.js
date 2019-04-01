import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withLoadingNames } from '../../context/loading-names';
import { withWords } from '../../context/words';
import WordsTable from './component';

const enhance = compose(
  withTheme,
  withRouter,
  withLoadingNames,
  withWords
);

export default enhance(WordsTable);
