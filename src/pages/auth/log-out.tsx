import React, { useContext } from 'react';
import styled from 'styled-components';
import { TitleBlock, ButtonPrimary } from '../../components';
import { ReactComponent as CryingGirlSvg } from '../../images/crying-girl.svg';
import { ThemeProps } from '../../types';
import { AuthContext } from '../../context/auth';

const Wrapper = styled.div`
  display: grid;
  margin-top: 10rem;
  grid-template-columns: 1fr 2fr;
  gap: ${(props: ThemeProps): string => props.theme.main.space.lg};
`;

const CryingGirl = styled(CryingGirlSvg)`
  max-width: 50rem;
  width: 100%;
  height: auto;
`;

const ActionsBlock = styled.div`
  padding: ${(props: ThemeProps): string => props.theme.main.space.md} 0;
`;

const LogOut = (): JSX.Element => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <Wrapper>
      <CryingGirl />
      <div>
        <TitleBlock>Already leaving?</TitleBlock>
        <ActionsBlock>
          <ButtonPrimary onClick={handleLogout} variant="outlined">
            Log out
          </ButtonPrimary>
        </ActionsBlock>
      </div>
    </Wrapper>
  );
};

export default LogOut;
