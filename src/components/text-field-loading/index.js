import { compose } from 'recompose';
import injectSheet from 'react-jss';
import styles from './styles';
import TextFieldLoading from './component';

const enhance = compose(
  injectSheet(styles)
);

export default enhance(TextFieldLoading);
