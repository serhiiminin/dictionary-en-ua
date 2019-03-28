import injectSheet from 'react-jss';
import { compose } from 'recompose';
import ButtonMenu from './component';
import styles from './styles';

const enhance = compose(injectSheet)(styles);

export default enhance(ButtonMenu);
