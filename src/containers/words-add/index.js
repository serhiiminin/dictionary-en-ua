import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withEditingWord } from '../../context/editing-word';
import { withFoundWord } from '../../context/found-word';
import { withWords } from '../../context/words';
import AddWord from './container';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withFoundWord,
  withWords,
  withEditingWord,
);

export default enhance(AddWord);
