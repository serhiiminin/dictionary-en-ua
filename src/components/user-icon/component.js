import React, { Component } from "react";
import PropTypes from "prop-types";
import { Avatar, Tooltip, CircularProgress } from "@material-ui/core";

class UserIcon extends Component {
  componentDidMount() {
    const { googleToken, fetchUser } = this.props;
    if (googleToken && googleToken.googleId) {
      fetchUser(googleToken.googleId);
    }
  }

  render() {
    const { user } = this.props;
    return Object.keys(user).length > 0 ? (
      <Tooltip title={user.name}>
        <Avatar alt={user.name} src={user.imageUrl} />
      </Tooltip>
    ) : (
      <CircularProgress />
    );
  }
}

UserIcon.propTypes = {
  user: PropTypes.shape({}),
  googleToken: PropTypes.shape({}),
  fetchUser: PropTypes.func.isRequired
};

UserIcon.defaultProps = {
  user: null,
  googleToken: null
};

export default UserIcon;
