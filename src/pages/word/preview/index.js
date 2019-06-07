import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withLoading } from '../../../context/loading';
import { withWords } from '../../../context/words';
import WordPreviewContainer from './component';

const enhance = compose(
  withRouter,
  withLoading,
  withWords
);

export default enhance(WordPreviewContainer);
