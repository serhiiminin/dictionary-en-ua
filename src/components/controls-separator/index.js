import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import ControlsSeparator from './component';
import styles from './styles';

const enhance = compose(withTheme(styles));

export default enhance(ControlsSeparator);
