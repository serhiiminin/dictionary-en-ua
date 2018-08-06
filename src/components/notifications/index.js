import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import uuid from 'uuid';
import { compose } from 'recompose';
import { NotificationItem } from '..';
import styles from './styles';

const NOTIFICATION_TIMEOUT = 5000;

const NotificationsContext = React.createContext([]);

class Notifications extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node
  };

  static defaultProps = {
    children: null,
  };

  state = {
    notifications: {}
  };

  hideNotification = id => {
    this.setState(prevState => ({
      notifications: Object.assign({},
        ...Object.entries(prevState.notifications)
          .filter(([key]) => key !== id)
          .map(([key, value]) => ({ [key]: value })))
    }));
  };

  showNotification = (text, type) => {
    const id = uuid();

    this.setState(prevState => ({
      notifications: {
        ...prevState.notifications,
        [id]: { text, type },
      }
    }));

    setTimeout(() => this.hideNotification(id), NOTIFICATION_TIMEOUT);
  };

  render() {
    const { classes, children } = this.props;
    const { notifications } = this.state;
    const notificationsTextList = Object.entries(notifications);

    return (
      <React.Fragment>
        <NotificationsContext.Provider
          value={{
            showNotification: this.showNotification,
          }}
        >
          {children}
        </NotificationsContext.Provider>
        <div className={classes.notifications}>
          {notificationsTextList.map(([id, value]) => {
            const { text, type } = value;

            return (
              <NotificationItem
                type={type}
                text={text}
                key={id}
                onClick={() => this.hideNotification(id)}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export { NotificationsContext };

const enhance = compose(
  injectSheet(styles)
);

export default enhance(Notifications);
