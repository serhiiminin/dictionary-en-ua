import { stylesVariables } from '../../constants/styles-variables';

const styles = {
  root: {
    width: '100%',
    '&:hover': {
      background: `${stylesVariables.colors.button} !important`,
      color: `${stylesVariables.colors.background} !important`,
    },
  },
  selected: {
    background: `${stylesVariables.colors.button} !important`,
    color: `${stylesVariables.colors.background} !important`,
  },
};

export default styles;
