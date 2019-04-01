import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import SelectWithOptions from './component';
import styles from './styles';

const enhance = compose(withTheme(styles));

export default enhance(SelectWithOptions);
