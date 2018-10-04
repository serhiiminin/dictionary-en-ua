import { compose } from 'recompose';
import injectSheet from 'react-jss';
import WordForm from './component';
import styles from './styles';

const enhance = compose(
  injectSheet(styles)
);

export default enhance(WordForm);
