import React, { useEffect } from 'react';
import { InfoBlock } from './index';
import { withAuth, AI } from '../context/auth';

const CheckSignUp = ({ removeEmailConfirmation }: AI): JSX.Element => {
  useEffect((): (() => void) => {
    return removeEmailConfirmation;
  }, []);
  return <InfoBlock title="Success" description="Check your email to confirm registration!" />;
};

export default withAuth(CheckSignUp);
