import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import FooterNavigation from './component';
import { withAuth } from '../../context/auth';

const enhance = compose(
  withRouter,
  withAuth,
  withTheme
);

export default enhance(FooterNavigation);
