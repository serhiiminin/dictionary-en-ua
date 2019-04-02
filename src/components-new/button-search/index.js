import React from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const ButtonSearch = styled(props => <Button {...props} />)`
  && {
    background: linear-gradient(149.02deg, #86d1ff -11.95%, #bbd6fd 89.7%, #c5d7fd 89.71%, #c5d7fd 89.73%);
    box-shadow: 9px 9px 15px rgba(15, 99, 203, 0.179551);
    border-radius: 8px;
    font-size: 18px;
    padding: 15px 55px;
    color: #fff;
    &:hover {
      background: linear-gradient(149.02deg, #86d1ff -11.95%, #bbd6fd 89.7%, #c5d7fd 89.71%, #c5d7fd 89.73%);
    }
  }
`;

export default ButtonSearch;
