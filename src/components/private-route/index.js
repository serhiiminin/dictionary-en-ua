import { compose } from 'recompose';
import { withAuth } from '../../context/auth';
import BlocksWrapper from './component';

const enhance = compose(withAuth);

export default enhance(BlocksWrapper);
