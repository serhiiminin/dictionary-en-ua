import React from 'react';
import PropTypes from 'prop-types';
import { TitleBlock, ButtonPrimary } from '../../../components';
import SC from './styles';

const LogOut = ({ handleLogout }) => (
  <SC.Wrapper>
    <SC.CryingGirl />
    <div>
      <TitleBlock>Already leaving?</TitleBlock>
      <SC.ActionsBlock>
        <ButtonPrimary onClick={handleLogout} variant="outlined">
          Log out
        </ButtonPrimary>
      </SC.ActionsBlock>
    </div>
  </SC.Wrapper>
);

LogOut.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default LogOut;
