import { Theme } from '../../../../types';

export default (theme: Theme): object => ({
  MuiMenuItem: {
    root: {
      width: '100%',
      '&:hover': {
        background: `${theme.main.color.main} !important`,
        color: `${theme.main.color.background} !important`,
      },
      '&$selected': {
        background: `${theme.main.color.main} !important`,
        color: `${theme.main.color.background} !important`,
      },
    },
  },
});
