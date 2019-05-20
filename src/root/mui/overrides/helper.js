export default theme => ({
  MuiFormHelperText: {
    root: {
      fontSize: theme.main.fontSizes.sm,
      '&$contained': {
        margin: `${theme.main.spaces.md} ${theme.main.spaces.md} 0`,
      },
      '&$error': {
        color: theme.main.colors.notification.error,
      },
    },
  },
});
