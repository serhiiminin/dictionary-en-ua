export default theme => ({
  MuiChip: {
    root: {
      fontSize: theme.main.fontSizes.sm,
      background: 'transparent',
      border: `${theme.main.borderWidth.base} ${theme.main.borderStyle.base} ${theme.main.colors.text}`,
      color: theme.main.colors.text,
      opacity: theme.main.opacity.disabled,
    },
  },
});
