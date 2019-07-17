import React from 'react';
import { ButtonProps } from '@material-ui/core/Button';
import ButtonSocial from './button-social';

const ButtonFacebook = (props: ButtonProps): JSX.Element => (
  <ButtonSocial {...props}>
    <svg width="11" height="21" viewBox="0 0 11 21" fill="none">
      <path
        d="M10.1445 7.61523H6.39453V5.11523C6.39453 4.42523 6.95453 3.86523 7.64453 3.86523H8.89453V0.740234H6.39453C4.32328 0.740234 2.64453 2.41898 2.64453 4.49023V7.61523H0.144531V10.7402H2.64453V20.7402H6.39453V10.7402H8.89453L10.1445 7.61523Z"
        fill="#1976D2"
      />
    </svg>
  </ButtonSocial>
);

export default ButtonFacebook;
