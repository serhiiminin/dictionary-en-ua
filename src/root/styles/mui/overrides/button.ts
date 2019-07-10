import { Theme } from '../../../../types';

export default (theme: Theme): object => ({
  MuiButton: {
    root: {
      color: theme.main.color.text,
      textTransform: 'none',
      transition: theme.main.transition.base,
      borderRadius: theme.main.borderRadius.md,
      '&:hover': {
        background: theme.main.color.main,
        opacity: theme.main.opacity.disabled,
      },
      '&$disabled': {
        opacity: theme.main.opacity.disabled,
      },
      '&$contained&$disabled': {
        color: theme.main.color.background,
      },
    },
    outlinedPrimary: {
      color: theme.main.color.text,
      borderColor: theme.main.color.text,
    },
  },
});
