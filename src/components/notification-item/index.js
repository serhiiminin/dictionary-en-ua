import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import { compose } from 'recompose';
import { notificationType } from '../notifications';
import styles from './styles';

const icons = {
  [notificationType.success]: <CheckCircleOutline/>,
  [notificationType.warning]: <WarningIcon/>,
  [notificationType.error]: <ErrorIcon/>,
};

const NotificationItem = ({ classes, onClick, text, type=notificationType.success, status }) => (
  <li className={`${classes.notification} ${classes[type]} ${classes[status]}`}>
    <div>
      <div className={classes.topLine}>
        {icons[type]}
        <div className={classes.wrapperCloseButton}>
          <button
            type='button'
            className={classes.closeButton}
            onClick={onClick}
          ><CloseIcon/>
          </button>
        </div>
      </div>
      <div>{text}</div>
    </div>
  </li>
);

NotificationItem.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
};

NotificationItem.defaultProps = {
  text: '',
  type: '',
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(NotificationItem);
