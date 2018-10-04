import stylesVariables from '../../constants/styles-variables';

const styles = {
  root: {
    background: stylesVariables.colors.button,
    color: stylesVariables.colors.background,
    verticalAlign: 'bottom',
    textTransform: 'none',
    transition: stylesVariables.transition,
    '&:hover': {
      background: stylesVariables.colors.button,
      opacity: stylesVariables.opacity.disabled,
    },
  },
  disabled: {
    opacity: stylesVariables.opacity.disabled,
    background: stylesVariables.colors.button,
    color: `${stylesVariables.colors.background} !important`,
  },
};

export default styles;
