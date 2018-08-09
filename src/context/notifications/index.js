import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const NotificationsContext = createContext({});

const NOTIFICATION_TIMEOUT = 5000;

class NotificationsProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
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

  showNotification = (text, type, autoHide=true) => {
    const id = uuid();

    this.setState(prevState => ({
      notifications: {
        ...prevState.notifications,
        [id]: { text, type },
      }
    }));
    if(autoHide) {
      setTimeout(() => this.hideNotification(id), NOTIFICATION_TIMEOUT);
    }
  };

  render() {
    const { notifications } = this.state;
    const { children } = this.props;

    return (
      <NotificationsContext.Provider
        value={{
          notifications,
          showNotification: this.showNotification,
          hideNotification: this.hideNotification,
        }}
      >{children}</NotificationsContext.Provider>
    )
  }
}

const withNotifications = Cmp => props =>
  <NotificationsContext.Consumer>{value => <Cmp {...value} {...props} />}</NotificationsContext.Consumer>;

export { NotificationsProvider, withNotifications};
