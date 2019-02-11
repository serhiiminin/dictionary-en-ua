import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withLoadingNames } from '../../context/loading-names';
import { withWords } from '../../context/words';
import WordsList from './container';

const enhance = compose(
  withRouter,
  withLoadingNames,
  withWords
);

export default enhance(WordsList);
