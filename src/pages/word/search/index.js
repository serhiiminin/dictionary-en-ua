import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withLoading, withWords } from '../../../context/hocs';
import SearchWordContainer from './component';

const enhance = compose(
  withRouter,
  withLoading,
  withWords
);

export default enhance(SearchWordContainer);
