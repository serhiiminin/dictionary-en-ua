import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { InfoBlock } from '../../components';

const CheckSignUp = ({ removeEmailConfirmation }) => {
  useEffect(() => () => removeEmailConfirmation(), []);

  return <InfoBlock title="Success" description="Check your email to confirm registration!" />;
};

CheckSignUp.propTypes = {
  removeEmailConfirmation: PropTypes.func.isRequired,
};

export default CheckSignUp;
