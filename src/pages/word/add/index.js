import { compose } from 'recompose';
import { withWords } from '../../../context/words';
import AddWord from './container';
import { withLoadingNames } from '../../../context/loading-names';

const enhance = compose(
  withLoadingNames,
  withWords
);

export default enhance(AddWord);
