export default theme => ({
  MuiSnackbarContent: {
    message: {
      fontSize: theme.main.fontSize.sm,
    },
  },
  MuiSnackbar: {
    anchorOriginTopRight: {
      opacity: theme.main.opacity.snackbar,
    },
  },
});
