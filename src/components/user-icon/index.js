import { withTheme } from 'styled-components';
import { compose } from 'recompose';
import { withUser } from '../../context/user';
import UserIcon from './component';

const enhance = compose(
  withUser,
  withTheme
);

export default enhance(UserIcon);
