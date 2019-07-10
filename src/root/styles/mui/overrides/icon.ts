import { Theme } from '../../../../types';

export default (theme: Theme): object => ({
  MuiSvgIcon: {
    root: {
      fontSize: theme.main.fontSize.lg,
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
});
