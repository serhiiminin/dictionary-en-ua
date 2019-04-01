import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import styles from './styles';
import Root from './component';

const enhance = compose(withTheme(styles));

export default enhance(Root);
