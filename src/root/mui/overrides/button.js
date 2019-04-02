export default theme => ({
  MuiButton: {
    root: {
      color: theme.main.colors.text,
      textTransform: 'none',
      transition: theme.main.transition,
      borderRadius: theme.main.borderRadius.medium,
      '&:hover': {
        background: theme.main.colors.main,
        opacity: theme.main.opacity.disabled,
      },
      '&$disabled': {
        opacity: theme.main.opacity.disabled,
        background: theme.main.colors.light,
        color: `${theme.main.colors.background} !important`,
      },
    },
    outlinedPrimary: {
      color: theme.main.colors.text,
      borderColor: theme.main.colors.text,
    },
  },
});
