import { compose } from 'recompose';
import { withLoadingNames } from '../../context/loading-names';
import { withWords } from '../../context/words';
import LearnWords from './component';

const enhance = compose(
  withLoadingNames,
  withWords,
);

export default enhance(LearnWords);
