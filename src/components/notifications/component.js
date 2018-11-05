import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { NotificationItem } from "..";
import styled from "styled-components";

const NotificationsItem = styled.ul`
  width: 300px;
  height: 0;
  position: fixed;
  right: ${props => props.theme.main.padding.medium};
  top: ${props => props.theme.main.padding.medium};
  z-index: ${props => props.theme.zIndex.tooltip};
  padding: 0;
  margin: 0;
`;

const Notifications = ({ children, notifications, hideNotification }) => (
  <Fragment>
    {children}
    <NotificationsItem>
      {notifications.map(({ id, text, type }) => (
        <NotificationItem
          type={type}
          text={text}
          key={id}
          status="entering"
          onClick={() => hideNotification(id)}
        />
      ))}
    </NotificationsItem>
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
  children: PropTypes.node.isRequired
};

Notifications.defaultProps = {
  notifications: []
};

export default Notifications;
