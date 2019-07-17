import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withWords, withLoading } from '../../../context/hocs';
import WordEdit from './component';

const enhance = compose(
  withRouter,
  withWords,
  withLoading
);

export default enhance(WordEdit);
