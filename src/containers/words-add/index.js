import { compose } from 'recompose';
import { withEditingWord } from '../../context/editing-word';
import { withFoundWord } from '../../context/found-word';
import { withWords } from '../../context/words';
import AddWord from './container';

const enhance = compose(
  withFoundWord,
  withWords,
  withEditingWord,
);

export default enhance(AddWord);
