import injectSheet from 'react-jss';
import { compose } from 'recompose';
import BlocksContainer from './component';
import styles from './styles';

const enhance = compose(
  injectSheet(styles)
);

export default enhance(BlocksContainer);
