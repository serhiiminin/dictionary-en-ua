import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { withLoadingNames } from '../../context/loading-names';
import { withNotifications } from '../../context/notifications';
import { withWords } from '../../context/words';
import LearnWords from './component';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withLoadingNames,
  withNotifications,
  withWords,
);

export default enhance(LearnWords);
