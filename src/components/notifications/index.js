import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Transition, TransitionGroup } from 'react-transition-group';
import { compose } from 'recompose';
import { NotificationItem } from '..';
import { withNotifications } from '../../context/notifications';
import { variables } from '../../styles/variables';
import styles from './styles';

export const notificationType = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

const Notifications = ({ children, notifications, classes, hideNotification }) => {
  const notificationsTextList = Object.entries(notifications);

  return (
    <Fragment>
      {children}
      <TransitionGroup className={classes.notifications} component="ul">
        {notificationsTextList.map(([id, value]) => {
          const { text, type } = value;

          return (
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
          );
        })}
      </TransitionGroup>
    </Fragment>
  );
};

Notifications.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  notifications: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  hideNotification: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  withNotifications
);

export default enhance(Notifications);
