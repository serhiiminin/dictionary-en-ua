import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@material-ui/core';
import styled from 'styled-components';
import ButtonPrimary from './button-primary';
import { ThemeProps } from '../types';

const Title = styled(DialogTitle)`
  && {
    font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.lg} !important;
  }
`;

const ContentText = styled(DialogContentText)`
  && {
    font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.sm};
  }
`;

interface Props {
  title: string;
  description: string;
  children(props: object): void;
  onConfirm(): void;
}

export interface DialogRenderProps {
  onOpen(): void;
}

const DialogCmp = ({ title, description, children, onConfirm }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  const handleSubmit = (): void => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      {children({ onOpen: handleOpen })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Title id="alert-dialog-title" disableTypography>
          {title}
        </Title>
        <DialogContent>
          <ContentText id="alert-dialog-description">{description}</ContentText>
        </DialogContent>
        <DialogActions>
          <ButtonPrimary onClick={handleClose} color="primary">
            Disagree
          </ButtonPrimary>
          <ButtonPrimary onClick={handleSubmit} color="primary" autoFocus>
            Agree
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogCmp;
