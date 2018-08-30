import { compose } from 'recompose';
import { withLoadingNames } from '../../context/loading-names';
import { withNotifications } from '../../context/notifications';
import { withWords } from '../../context/words';
import LearnWords from './component';

const enhance = compose(
  withLoadingNames,
  withNotifications,
  withWords,
);

export default enhance(LearnWords);
