import { compose } from 'recompose';
import { withLoadingNames } from '../../context/loading-names';
import { withNotifications } from '../../context/notifications';
import { withWordsToLearn } from '../../context/words-to-learn';
import LearnWords from './container';

const enhance = compose(
  withLoadingNames,
  withNotifications,
  withWordsToLearn,
);

export default enhance(LearnWords);
