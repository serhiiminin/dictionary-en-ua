import { variables } from '../../styles/variables';

const styles = {
  root: {
    background: variables.colors.button,
    color: variables.colors.background,
    verticalAlign: 'bottom',
    textTransform: 'none',
    transition: variables.transition,
    '&:hover': {
      background: variables.colors.button,
      opacity: variables.opacity.disabled,
    },
  },
  disabled: {
    opacity: variables.opacity.disabled,
    background: variables.colors.button,
    color: `${variables.colors.background} !important`,
  },
};

export default styles;
