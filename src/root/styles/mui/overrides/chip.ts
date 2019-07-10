import { Theme } from '../../../../types';

export default (theme: Theme): object => ({
  MuiChip: {
    root: {
      fontSize: theme.main.fontSize.sm,
      background: 'transparent',
      border: `${theme.main.borderWidth.base} ${theme.main.borderStyle.base} ${theme.main.color.text}`,
      color: theme.main.color.text,
      opacity: theme.main.opacity.disabled,
    },
  },
});
