import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withWords } from '../../context/words';
import WordEdit from './container';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withWords,
);

export default enhance(WordEdit);
