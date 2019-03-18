import { createMuiTheme } from '@material-ui/core';
import theme from './themes';

const muiTheme = createMuiTheme({
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
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        transition: theme.main.transition,
        '&:hover': {
          background: theme.main.colors.main,
          opacity: theme.main.opacity.disabled,
        },
        '&$disabled': {
          opacity: theme.main.opacity.disabled,
          background: theme.main.colors.light,
          color: `${theme.main.colors.background} !important`,
        },
      },
    },
    MuiChip: {
      root: {
        fontSize: '.9em',
        background: 'transparent',
        border: `${theme.main.borderWidth.base} ${theme.main.borderStyle.base} ${theme.main.colors.text}`,
        color: theme.main.colors.text,
        opacity: theme.main.opacity.disabled,
      },
    },
    MuiFormControl: {
      root: {
        width: '100%',
      },
    },
    MuiLinearProgress: {
      root: {
        background: theme.main.colors.background,
      },
    },
    MuiMenuItem: {
      root: {
        width: '100%',
        '&:hover': {
          background: `${theme.main.colors.main} !important`,
          color: `${theme.main.colors.background} !important`,
        },
        '&$selected': {
          background: `${theme.main.colors.main} !important`,
          color: `${theme.main.colors.background} !important`,
        },
      },
    },
    MuiSelect: {
      root: {
        width: '100%',
      },
      select: {
        background: 'transparent !important',
      },
    },
    MuiTextField: {
      root: {
        width: '100%',
      },
      label: {
        color: `${theme.main.colors.text} !important`,
        opacity: 0.7,
      },
      underline: {
        '&:after': {
          borderBottomColor: `${theme.main.colors.text} !important`,
        },
      },
    },
    MuiSnackbar: {
      anchorOriginTopRight: {
        opacity: 0.9,
      },
    },
  },
  ...theme,
});

export default muiTheme;
