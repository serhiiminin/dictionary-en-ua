import { createMuiTheme } from "@material-ui/core";
import theme from "./themes";

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      light: theme.main.colors.block,
      main: theme.main.colors.button,
      dark: theme.main.colors.button,
      contrastText: theme.main.colors.background
    },
    secondary: {
      light: theme.main.colors.block,
      main: theme.main.colors.button,
      dark: theme.main.colors.button,
      contrastText: theme.main.colors.block
    }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        transition: theme.main.transition,
        "&:hover": {
          background: theme.main.colors.button,
          opacity: theme.main.opacity.disabled
        }
      },
      disabled: {
        opacity: theme.main.opacity.disabled,
        background: theme.main.colors.button,
        color: `${theme.main.colors.background} !important`
      }
    },
    MuiChip: {
      root: {
        fontSize: ".9em",
        background: "transparent",
        border: `${theme.main.borderWidth.base} ${theme.main.borderStyle.base} ${theme.main.colors.text}`,
        color: theme.main.colors.text,
        opacity: theme.main.opacity.disabled
      }
    },
    MuiFormControl: {
      root: {
        width: '100%',
      }
    },
    MuiLinearProgress: {
      root: {
        background: theme.main.colors.background,
      }
    },
    MuiMenuItem: {
      root: {
        width: '100%',
        '&:hover': {
          background: `${theme.main.colors.button} !important`,
          color: `${theme.main.colors.background} !important`
        }
      },
      selected: {
        background: `${theme.main.colors.button} !important`,
        color: `${theme.main.colors.background} !important`
      }
    },
    MuiSelect: {
      root: {
        width: '100%',
      },
      select: {
        background: 'transparent !important',
      }
    },
    MuiTextField: {
      root: {
        width: '100%',
      },
      label: {
        color: `${theme.main.colors.text} !important`,
        opacity: .7,
      },
      underline: {
        '&:after': {
          borderBottomColor: `${theme.main.colors.text} !important`,
        }
      }
    }
  }
});

export default muiTheme;
