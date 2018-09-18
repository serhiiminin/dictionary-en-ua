import { compose } from 'recompose';
import { withLoadingNames } from '../../context/loading-names';
import { withWords } from '../../context/words';
import WordsList from './component';

const enhance = compose(
  withLoadingNames,
  withWords,
);

export default enhance(WordsList);
