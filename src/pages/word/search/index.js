import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import { withLoading } from '../../../context/loading';
import { withWords } from '../../../context/words';
import SearchWordContainer from './component';

const enhance = compose(
  withRouter,
  withLoading,
  withWords,
  withTheme
);

export default enhance(SearchWordContainer);
