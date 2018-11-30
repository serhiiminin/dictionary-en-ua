const theme = {
  main: {
    colors: {
      background: '#F6F0ED',
      text: '#333333',
      main: '#28536B',
      dark: '#66D4CA',
      light: '#BBB193',
      contrastText: '#C2948A',
      notification: {
        success: '#83F570',
        error: '#F21600',
        warning: '#FAE639',
        info: '#A9D9E4',
      }
    },
    opacity: {
      disabled: .7,
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
      base: '1px'
    },
    borderStyle: {
      base: 'solid',
    },
    borderRadius: {
      small: '5px',
      medium: '10px',
      large: '15px',
    },
    zIndex: {
      notification: 1000,
    },
    timeout: {
      notification: 300,
    },
    transition: '.3s'
  }
};

export default theme;
