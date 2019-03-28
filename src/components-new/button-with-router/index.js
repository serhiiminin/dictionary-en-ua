import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import ButtonWithRouter from './component';

const enhance = compose(withRouter);

export default enhance(ButtonWithRouter);
