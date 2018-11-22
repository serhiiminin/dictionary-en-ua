import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { withLoadingNames } from '../../context/loading-names';
import { withNotifications } from '../../context/notifications';
import LearnWords from './container';
import styles from './styles';
import { withWords } from '../../context/words';

const enhance = compose(
  injectSheet(styles),
  withLoadingNames,
  withNotifications,
  withWords,
);

export default enhance(LearnWords);
