import React from "react";
import PropTypes from "prop-types";
import { Grow } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import CloseButton from "../close-button";
import notificationType from '../../constants/notifications-type';
import composeClassesPropTypes from '../../helpers/compose-classes-prop-types';
import styles from './styles';

const icons = {
  [notificationType.success]: <CheckCircleOutlineIcon />,
  [notificationType.info]: <InfoIcon />,
  [notificationType.warning]: <WarningIcon />,
  [notificationType.error]: <ErrorIcon />
};

const NotificationItem = ({ classes, onClick, text, type }) => (
  <Grow in timeout={400}>
    <li className={classes.notification}>
      <div className={classes.topLine}>
        {icons[type]}
        <div className={classes.wrapperCloseButton}>
          <CloseButton onClick={onClick} />
        </div>
      </div>
      <div>{text}</div>
    </li>
  </Grow>
);

NotificationItem.propTypes = {
  classes: composeClassesPropTypes(styles),
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
};

NotificationItem.defaultProps = {
  text: "",
  type: notificationType.error,
  classes: {}
};

export default NotificationItem;
