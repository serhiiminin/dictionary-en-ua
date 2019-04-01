import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import SearchableWord from './component';
import styles from './styles';

const enhance = compose(withTheme(styles));

export default enhance(SearchableWord);
