import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import Toolbar from './component';
import styles from './styles';

const enhance = compose(withTheme(styles));

export default enhance(Toolbar);
