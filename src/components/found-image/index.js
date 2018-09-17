import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { withLoadingNames } from '../../context/loading-names';
import FoundImage from './component';
import styles from './styles';

const enhance = compose(
  withLoadingNames,
  injectSheet(styles)
);

export default enhance(FoundImage);
