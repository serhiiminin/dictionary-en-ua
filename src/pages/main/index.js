import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import Main from './component';

const enhance = compose(
  withRouter,
  withTheme
);

export default enhance(Main);
