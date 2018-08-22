import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import { notificationType } from '../notifications/component';

const icons = {
  [notificationType.success]: <CheckCircleOutlineIcon/>,
  [notificationType.info]: <InfoIcon/>,
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
  classes: classesShape,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
};

NotificationItem.defaultProps = {
  text: '',
  type: '',
  classes: classesDefaultProps,
};

export default NotificationItem;
