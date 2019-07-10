import { Theme } from '../../../../types';

export default (theme: Theme): object => ({
  MuiFormHelperText: {
    root: {
      fontSize: theme.main.fontSize.xs,
      '&$contained': {
        margin: `${theme.main.space.xs} ${theme.main.space.sm} 0`,
      },
      '&$error': {
        color: theme.main.color.notification.error,
      },
    },
  },
});
