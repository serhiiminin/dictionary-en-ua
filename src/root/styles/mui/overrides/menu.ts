import { Theme } from '../../../../types';

export default (theme: Theme): object => ({
  MuiMenuItem: {
    root: {
      width: '100%',
      '&:hover': {
        background: `${theme.main.color.main}`,
        color: `${theme.main.color.background}`,
      },
      '&$selected': {
        background: `${theme.main.color.main}`,
        color: `${theme.main.color.background}`,
      },
    },
  },
});
