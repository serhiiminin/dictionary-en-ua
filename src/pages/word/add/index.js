import { compose } from 'recompose';
import { withWords, withLoading } from '../../../context/hocs';
import AddWord from './component';

const enhance = compose(
  withLoading,
  withWords
);

export default enhance(AddWord);
