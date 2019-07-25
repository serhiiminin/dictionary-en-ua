import React, { useEffect } from 'react';
import { InfoBlock } from '../components';
import { withAuth, AI } from '../context/auth';

const CheckSignUp = ({ removeEmailConfirmation }: AI): JSX.Element => {
  useEffect((): (() => void) => {
    return removeEmailConfirmation;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <InfoBlock title="Success" description="Check your email to confirm registration!" />;
};

export default withAuth(CheckSignUp);
