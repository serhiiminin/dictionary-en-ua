import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import PageNotFound from './container';
import styles from './styles';

const enhance = compose(withTheme(styles));

export default enhance(PageNotFound);
