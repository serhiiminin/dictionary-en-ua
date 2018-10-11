import { compose } from 'recompose';
import injectSheet from 'react-jss';
import MainContainer from './container';
import styles from './styles';

const enhance = compose(
  injectSheet(styles)
);

export default enhance(MainContainer);
