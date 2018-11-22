import { withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withLoadingNames } from '../../context/loading-names';
import { withWords } from '../../context/words';
import SearchWord from './container';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withLoadingNames,
  withWords,
);

export default enhance(SearchWord);
