import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { NotificationItem } from "..";
import composeClassesPropTypes from '../../helpers/compose-classes-prop-types';
import styles from './styles';

const Notifications = ({ classes, children, notifications, hideNotification }) => (
  <Fragment>
    {children}
    <ul className={classes.notifications}>
      {notifications.map(({ id, text, type }) => (
        <NotificationItem
          type={type}
          text={text}
          key={id}
          status="entering"
          onClick={() => hideNotification(id)}
        />
      ))}
    </ul>
  </Fragment>
);

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string,
      type: PropTypes.string
    })
  ),
  hideNotification: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  classes: composeClassesPropTypes(styles),
};

Notifications.defaultProps = {
  notifications: [],
  classes: {},
};

export default Notifications;
