import injectSheet from 'react-jss';
import { compose } from 'recompose';
import MainPage from './container';
import styles from './styles';

const enhance = compose(injectSheet(styles));

export default enhance(MainPage);
