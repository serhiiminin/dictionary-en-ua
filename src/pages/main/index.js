import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import Main from './container';

const enhance = compose(
  withRouter,
  withTheme
);

export default enhance(Main);
