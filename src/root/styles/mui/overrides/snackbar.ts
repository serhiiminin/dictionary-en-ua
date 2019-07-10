import { Theme } from '../../../../types';

export default (theme: Theme): object => ({
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
