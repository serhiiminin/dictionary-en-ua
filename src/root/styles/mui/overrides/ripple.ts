import { Theme } from '../../../../types';

export default (theme: Theme): object => ({
  MuiTouchRipple: {
    childPulsate: {
      background: theme.main.color.dark,
    },
  },
});
