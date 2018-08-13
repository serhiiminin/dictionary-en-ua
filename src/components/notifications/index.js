import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Transition, TransitionGroup } from 'react-transition-group';
import { compose } from 'recompose';
import { NotificationItem } from '..';
import { notificationInitialState, withNotifications } from '../../context/notifications';
import { notificationsListShape } from '../../context/notifications/shape';
import { variables } from '../../styles/variables';
import styles from './styles';

export const notificationType = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

const Notifications = ({ children, notifications, classes, hideNotification }) => (
  <Fragment>
    {children}
    <TransitionGroup className={classes.notifications} component="ul">
      {notifications.map(({ id, text, type }) => (
        <Transition
          timeout={variables.timeout.notification}
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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  notifications: notificationsListShape,
  hideNotification: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Notifications.defaultProps = {
  notifications: notificationInitialState,
};


const enhance = compose(
  injectSheet(styles),
  withNotifications
);

export default enhance(Notifications);
