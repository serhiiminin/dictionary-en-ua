import React from "react";
import PropTypes from "prop-types";
import { Slide } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import styled from "styled-components";
import CloseButton from "../close-button";

export const notificationType = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info"
};

export const NotificationItemWrapper = styled.li`
  width: 100%;
  border-radius: ${props => props.theme.main.borderRadius.small};
  padding: ${props => props.theme.main.padding.medium};
  margin-bottom: ${props => props.theme.main.margin.medium};
  list-style: none;
  transition: ${props =>
    `all ${props.theme.main.timeout.notification}ms ease-in-out`};
  opacity: 1 !important;
  background: ${props => props.theme.main.colors.notification[props.type]};
`;

export const TopLine = styled.div`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  margin-bottom: ${props => props.theme.main.margin.medium};
`;

export const WrapperCloseButton = styled.div`
  text-align: right;
`;

const icons = {
  [notificationType.success]: <CheckCircleOutlineIcon />,
  [notificationType.info]: <InfoIcon />,
  [notificationType.warning]: <WarningIcon />,
  [notificationType.error]: <ErrorIcon />
};

const NotificationItem = ({ onClick, text, type }) => (
  <Slide direction="up" in mountOnEnter unmountOnExit>
    <NotificationItemWrapper type={type}>
      <TopLine>
        {icons[type]}
        <WrapperCloseButton>
          <CloseButton onClick={onClick} />
        </WrapperCloseButton>
      </TopLine>
      <div>{text}</div>
    </NotificationItemWrapper>
  </Slide>
);

NotificationItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  type: PropTypes.string
};

NotificationItem.defaultProps = {
  text: "",
  type: notificationType.error
};

export default NotificationItem;
