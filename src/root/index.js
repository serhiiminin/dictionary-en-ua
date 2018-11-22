import injectSheet from 'react-jss';
import normalize from 'normalize-jss';
import { compose } from 'recompose';
import styles from './styles';
import Root from './component';

const enhance = compose(
  injectSheet({
    ...normalize,
    ...styles,
  }),
);

export default enhance(Root); 
