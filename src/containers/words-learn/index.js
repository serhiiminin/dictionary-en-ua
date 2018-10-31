import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { withLoadingNames } from '../../context/loading-names';
import { withNotifications } from '../../context/notifications';
import { withWordsToLearn } from '../../context/words-to-learn';
import LearnWords from './container';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withLoadingNames,
  withNotifications,
  withWordsToLearn,
);

export default enhance(LearnWords);
