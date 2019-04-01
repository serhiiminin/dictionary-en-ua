import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import Main from './container';
import styles from './styles';

const enhance = compose(
  withRouter,
  withTheme(styles)
);

export default enhance(Main);
