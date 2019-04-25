import styled from 'styled-components';
import ButtonPrimary from '../button-primary';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Inner = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  margin: 0;
  font-family: 'Cairo', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 45px;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Description = styled.p`
  line-height: 26px;
  text-align: center;
  letter-spacing: 2px;
  margin: 0;
`;

const Button = styled(ButtonPrimary)`
  && {
    margin-top: 10px;
  }
`;

export default { Wrapper, Inner, Title, Description, Button };
