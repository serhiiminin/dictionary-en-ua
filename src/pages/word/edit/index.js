import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withWords } from '../../../context/words';
import WordEdit from './component';
import { withLoading } from '../../../context/loading';

const enhance = compose(
  withRouter,
  withWords,
  withLoading
);

export default enhance(WordEdit);
