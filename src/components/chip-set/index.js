import { compose } from 'recompose';
import injectSheet from 'react-jss';
import ChipSet from './component';
import styles from './styles';

const enhance = compose(
  injectSheet(styles)
);

export default enhance(ChipSet);