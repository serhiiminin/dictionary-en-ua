const theme = {
  main: {
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
    opacity: {
      disabled: 0.7,
    },
    margin: {
      small: '5px',
      medium: '10px',
      large: '15px',
    },
    padding: {
      small: '5px',
      medium: '10px',
      large: '15px',
    },
    borderWidth: {
      base: '1px',
    },
    borderStyle: {
      base: 'solid',
    },
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '12px',
    },
    zIndex: {
      notification: 1000,
    },
    timeout: {
      notification: 300,
    },
    transition: '.3s',
  },
};

export default theme;
