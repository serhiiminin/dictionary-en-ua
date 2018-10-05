import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NotificationItem } from '..';

const Notifications = ({ children, notifications, classes, hideNotification }) => (
  <Fragment>
    {children}
    <ul className={classes.notifications}>
      {notifications
        .map(({ id, text, type }) => (
          <NotificationItem
            type={type}
            text={text}
            key={id}
            status='entering'
            onClick={() => hideNotification(id)}
          />
        ))}
    </ul>
  </Fragment>
);

Notifications.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.string,
  })),
  hideNotification: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Notifications.defaultProps = {
  notifications: [],
  classes: {},
};

export default Notifications;
