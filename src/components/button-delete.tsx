import React from 'react';
import styled from 'styled-components';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { DeleteOutline } from '@material-ui/icons';
import { ThemeProps } from '../types';

const Button = styled((props: IconButtonProps): JSX.Element => <IconButton {...props} />)`
  && {
    background: ${(props: ThemeProps): string => props.theme.main.color.background};
    padding: 0;
    &:hover {
      background: ${(props: ThemeProps): string => props.theme.main.color.background};
    }
  }
`;

const DeleteIcon = styled(props => <DeleteOutline {...props} />)`
  && {
    font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.xl};
    &:hover {
      color: ${(props: ThemeProps): string => props.theme.main.color.notification.error};
    }
  }
`;

interface Props {
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

const ButtonDelete = ({ onClick, ...props }: Props): JSX.Element => (
  <Button onClick={onClick} {...props}>
    <DeleteIcon />
  </Button>
);

export default ButtonDelete;
