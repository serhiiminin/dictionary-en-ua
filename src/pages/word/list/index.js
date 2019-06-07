import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withLoading } from '../../../context/loading';
import { withWords } from '../../../context/words';
import WordsList from './component';

const enhance = compose(
  withRouter,
  withLoading,
  withWords
);

export default enhance(WordsList);
