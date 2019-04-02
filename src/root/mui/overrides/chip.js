export default theme => ({
  MuiChip: {
    root: {
      fontSize: '.9em',
      background: 'transparent',
      border: `${theme.main.borderWidth.base} ${theme.main.borderStyle.base} ${theme.main.colors.text}`,
      color: theme.main.colors.text,
      opacity: theme.main.opacity.disabled,
    },
  },
});
