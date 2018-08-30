import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { notificationInitialState } from '../../context/notifications';
import { notificationsListShape } from '../../context/notifications/shape';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import { stylesVariables } from '../../defaults/styles-variables';
import { NotificationItem } from '..';

const Notifications = ({ children, notifications, classes, hideNotification }) => (
  <Fragment>
    {children}
    <TransitionGroup className={classes.notifications} component="ul">
      {notifications
        .map(({ id, text, type }) => (
        <Transition
          timeout={stylesVariables.timeout.notification}
          unmountOnExit
          key={id}
        >{status => (
          <NotificationItem
            type={type}
            text={text}
            key={id}
            status={status}
            onClick={() => hideNotification(id)}
          />
        )}
        </Transition>
      ))}
    </TransitionGroup>
  </Fragment>
);

Notifications.propTypes = {
  classes: classesShape,
  notifications: notificationsListShape,
  hideNotification: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Notifications.defaultProps = {
  notifications: notificationInitialState,
  classes: classesDefaultProps,
};

export default Notifications;
