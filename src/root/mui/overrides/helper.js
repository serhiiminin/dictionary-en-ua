export default theme => ({
  MuiFormHelperText: {
    root: {
      fontSize: '12px',
      '&$contained': {
        margin: `${theme.main.padding.small} ${theme.main.padding.medium} 0`,
      },
      '&$error': {
        color: theme.main.colors.notification.error,
      },
    },
  },
});
