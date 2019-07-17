import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withLoading, withWords } from '../../../context/hocs';
import WordsList from './component';

const enhance = compose(
  withRouter,
  withLoading,
  withWords
);

export default enhance(WordsList);
