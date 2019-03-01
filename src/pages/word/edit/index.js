import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withWords } from '../../../context/words';
import WordEdit from './container';
import { withLoadingNames } from '../../../context/loading-names';

const enhance = compose(
  withRouter,
  withWords,
  withLoadingNames
);

export default enhance(WordEdit);
