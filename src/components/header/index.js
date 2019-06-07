import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import { withAuth } from '../../context/auth';
import { withLoading } from '../../context/loading';
import Header from './component';

const enhance = compose(
  withLoading,
  withAuth,
  withTheme
);

export default enhance(Header);
