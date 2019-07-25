import { Theme } from '../../../../types';

export default (theme: Theme): object => ({
  MuiTooltip: {
    tooltipPlacementRight: {
      fontSize: theme.main.fontSize.xs,
      background: theme.main.color.text,
      color: theme.main.color.background,
    },
  },
});
