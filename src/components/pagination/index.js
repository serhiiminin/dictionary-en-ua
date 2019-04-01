import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import Pagination from './component';
import styles from './styles';

const enhance = compose(withTheme(styles));

export default enhance(Pagination);
