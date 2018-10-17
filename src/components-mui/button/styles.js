const styles = theme => ({
  root: {
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
  active: {
    opacity: theme.main.opacity.disabled,
  }
});

export default styles;
