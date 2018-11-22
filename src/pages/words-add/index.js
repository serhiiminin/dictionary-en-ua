import { compose } from 'recompose';
import { withFoundWord } from '../../context/found-word';
import { withWords } from '../../context/words';
import AddWord from './container';
import { withLoadingNames } from '../../context/loading-names';

const enhance = compose(
  withLoadingNames,
  withFoundWord,
  withWords,
);

export default enhance(AddWord);
