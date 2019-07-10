import { Theme } from '../../../../types';

export default (theme: Theme): object => ({
  MuiLinearProgress: {
    root: {
      background: theme.main.color.background,
    },
  },
});
