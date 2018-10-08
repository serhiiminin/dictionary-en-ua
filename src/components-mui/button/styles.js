const styles = theme => ({
  root: {
    background: theme.main.colors.button,
    color: theme.main.colors.background,
    verticalAlign: 'bottom',
    textTransform: 'none',
    transition: theme.main.transition,
    '&:hover': {
      background: theme.main.colors.button,
      opacity: theme.main.opacity.disabled,
    },
  },
  disabled: {
    opacity: theme.main.opacity.disabled,
    background: theme.main.colors.button,
    color: `${theme.main.colors.background} !important`,
  },
});

export default styles;
