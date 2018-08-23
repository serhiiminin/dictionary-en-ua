import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import CloseButton from '../close-button';

export const notificationType = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

const icons = {
  [notificationType.success]: <CheckCircleOutlineIcon/>,
  [notificationType.info]: <InfoIcon/>,
  [notificationType.warning]: <WarningIcon/>,
  [notificationType.error]: <ErrorIcon/>,
};

const NotificationItem = ({ classes, onClick, text, type, status }) => (
  <li className={`${classes.notification} ${classes[type]} ${classes[status]}`}>
    <div className={classes.topLine}>
      {icons[type]}
      <div className={classes.wrapperCloseButton}>
        <CloseButton
          onClick={onClick}
        />
      </div>
    </div>
    <div>{text}</div>
  </li>
);

NotificationItem.propTypes = {
  classes: classesShape,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
};

NotificationItem.defaultProps = {
  text: '',
  type: notificationType.error,
  classes: classesDefaultProps,
};

export default NotificationItem;
