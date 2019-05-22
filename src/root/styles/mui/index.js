import { createMuiTheme } from '@material-ui/core';
import overrides from './overrides';
import theme from '../themes';

const muiTheme = createMuiTheme({
  overrides,
  palette: {
    background: {
      paper: theme.main.colors.background,
    },
    primary: {
      light: theme.main.colors.light,
      main: theme.main.colors.main,
      dark: theme.main.colors.dark,
      contrastText: theme.main.colors.contrastText,
    },
    secondary: {
      light: theme.main.colors.light,
      main: theme.main.colors.main,
      dark: theme.main.colors.dark,
      contrastText: theme.main.colors.contrastText,
    },
    text: {
      primary: theme.main.colors.text,
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: `${theme.main.fontFamilies.cairoRegular}, sans-serif`,
    fontSize: theme.main.fontSizes.md,
  },
  ...theme,
});

export default muiTheme;
