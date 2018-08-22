import injectSheet from 'react-jss';
import { compose } from 'recompose';import { withLoadingNames } from '../../context/loading-names';
import { withWordForm } from '../../context/word-form';
import { withWords } from '../../context/words';
import styles from './styles';
import FormAddWord from './component';

const enhance = compose(
  injectSheet(styles),
  withLoadingNames,
  withWords,
  withWordForm,
);

export default enhance(FormAddWord);
