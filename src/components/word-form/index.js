import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { withLoadingNames } from '../../context/loading-names';
import WordForm from './component';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withLoadingNames,
);

export default enhance(WordForm);
