import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withLoadingNames } from '../../context/loading-names';
import { withWords } from '../../context/words';
import WordPreviewContainer from './container';

const enhance = compose(
  withRouter,
  withLoadingNames,
  withWords,
);

export default enhance(WordPreviewContainer);
