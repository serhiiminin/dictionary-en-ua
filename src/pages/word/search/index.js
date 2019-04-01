import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import { withLoadingNames } from '../../../context/loading-names';
import { withWords } from '../../../context/words';
import SearchWordContainer from './container';
import styles from './styles';

const enhance = compose(
  withTheme(styles),
  withRouter,
  withLoadingNames,
  withWords
);

export default enhance(SearchWordContainer);
