import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import { withAuth } from '../../context/auth';
import { withLoadingNames } from '../../context/loading-names';
import Header from './component';

const enhance = compose(
  withTheme,
  withLoadingNames,
  withAuth
);

export default enhance(Header);
