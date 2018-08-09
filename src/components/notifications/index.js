import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { NotificationItem } from '..';
import { withNotifications } from '../../context/notifications';
import styles from './styles';

export const notificationType = {
  success: 'success',
  warning: 'warning',
  error: 'error',
};

const Notifications = ({ children, notifications, classes, hideNotification }) => {
  const notificationsTextList = Object.entries(notifications);

  return (
    <Fragment>
      {children}
      <div className={classes.notifications}>
        {notificationsTextList.map(([id, value]) => {
          const { text, type } = value;

          return (
            <NotificationItem
              type={type}
              text={text}
              key={id}
              onClick={() => hideNotification(id)}
            />
          );
        })}
      </div>
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
