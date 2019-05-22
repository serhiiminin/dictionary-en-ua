import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const LogOut = ({ handleLogout }) => (
  <>
    <h1>Log out</h1>
    <Button onClick={handleLogout} variant="outlined">
      Log out
    </Button>
  </>
);

LogOut.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default LogOut;
