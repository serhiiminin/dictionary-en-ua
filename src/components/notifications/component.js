import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Slide, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { NOTIFICATION_TIMEOUT } from '../../context/notifications';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import { NotificationMessage } from '..';
import styles from './styles';

const Notifications = ({ classes, children, notifications, hideNotification }) => {
  const { text, id, type } = notifications[0] || {};

  return (
    <Fragment>
      {children}
      <Snackbar
        className={classes.margin}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notifications.length > 0}
        autoHideDuration={NOTIFICATION_TIMEOUT}
        TransitionComponent={Slide}
        onClose={() => hideNotification(id)}
        transitionDuration={200}
        message={(
          <NotificationMessage
            text={text}
            type={type}
          />
        )}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => hideNotification(id)}
          >
            <Close />
          </IconButton>,
        ]}
      />
    </Fragment>
  );
};

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
  classes: composeClassesPropTypes(styles)
};

Notifications.defaultProps = {
  notifications: [],
  classes: {}
};

export default Notifications;
