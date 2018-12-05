import React from "react";
import PropTypes from "prop-types";
import { Avatar, Tooltip, CircularProgress } from "@material-ui/core";

const UserIcon = ({ user }) =>
  user && Object.keys(user).length > 0 ? (
    <Tooltip title={user.name}>
      <Avatar alt={user.name} src={user.imageUrl} />
    </Tooltip>
  ) : (
    <CircularProgress />
  );

UserIcon.propTypes = {
  user: PropTypes.shape({}),
  googleToken: PropTypes.shape({}),
};

UserIcon.defaultProps = {
  user: null,
  googleToken: null
};

export default UserIcon;
