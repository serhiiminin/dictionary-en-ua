import React from "react";
import PropTypes from "prop-types";
import { Avatar, Tooltip, CircularProgress } from "@material-ui/core";

const UserIcon = ({ user, isLoading }) =>
  isLoading || (user && Object.keys(user).length === 0) ? (
    <CircularProgress />
  ) : (
    <Tooltip title={user.name}>
      <Avatar alt={user.name} src={user.imageUrl} />
    </Tooltip>
  );

UserIcon.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  }),
  googleToken: PropTypes.shape({}),
  isLoading: PropTypes.bool
};

UserIcon.defaultProps = {
  user: null,
  googleToken: null,
  isLoading: false
};

export default UserIcon;
