import { compose } from 'recompose';
import { withWords } from '../../../context/words';
import AddWord from './component';
import { withLoading } from '../../../context/loading';

const enhance = compose(
  withLoading,
  withWords
);

export default enhance(AddWord);
