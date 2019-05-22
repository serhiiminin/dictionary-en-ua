const theme = {
  main: {
    borderRadius: {
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
    },
    borderStyle: {
      base: 'solid',
    },
    borderWidth: {
      base: '1px',
    },
    colors: {
      background: '#FFFFFF',
      text: '#161617',
      main: '#979797',
      dark: '#86D1FF',
      light: '#C5D7FD',
      contrastText: '#AC3B61',
      notification: {
        success: '#83F570',
        error: '#F21600',
        warning: '#FAE639',
        info: '#A9D9E4',
      },
    },
    fontFamilies: {
      cairoRegular: 'Cairo Regular',
    },
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
    },
    letterSpacing: {
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '10px',
    },
    lineHeight: {
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '10px',
    },
    spaces: {
      xs: '5px',
      sm: '10px',
      md: '15px',
      lg: '20px',
      xl: '25px',
    },
    opacity: {
      disabled: 0.7,
      snackbar: 0.9,
    },
    zIndex: {
      notification: 1000,
    },
    transition: {
      base: 300,
      button: 100,
      notification: 300,
    },
  },
};

export default theme;
