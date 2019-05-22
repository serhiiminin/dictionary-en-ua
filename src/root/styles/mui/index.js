import { createMuiTheme } from '@material-ui/core';
import overrides from './overrides';
import theme from '../themes';

const muiTheme = createMuiTheme({
  overrides,
  palette: {
    background: {
      paper: theme.main.color.background,
    },
    primary: {
      light: theme.main.color.light,
      main: theme.main.color.main,
      dark: theme.main.color.dark,
      contrastText: theme.main.color.contrastText,
    },
    secondary: {
      light: theme.main.color.light,
      main: theme.main.color.main,
      dark: theme.main.color.dark,
      contrastText: theme.main.color.contrastText,
    },
    text: {
      primary: theme.main.color.text,
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: `${theme.main.fontFamily.cairoRegular}, sans-serif`,
    fontSize: theme.main.fontSize.md,
  },
  ...theme,
});

export default muiTheme;
