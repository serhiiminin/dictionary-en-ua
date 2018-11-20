import { compose } from 'recompose';
import HeaderNavigation from './component';
import { withTokens } from '../../context/tokens';

const enhance = compose(
  withTokens,
);

export default enhance(HeaderNavigation);
