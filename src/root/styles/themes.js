const theme = {
  main: {
    borderRadius: {
      xs: '.2rem',
      sm: '.4rem',
      md: '.8rem',
      lg: '1.2rem',
      xl: '1.6rem',
    },
    borderStyle: {
      base: 'solid',
    },
    borderWidth: {
      base: '.1rem',
    },
    breakpoint: {
      xs: '57.6em',
      sm: '76.8em',
      md: '99.2em',
      lg: '120em',
    },
    boxShadow: {
      block: '.4rem .8rem 4rem rgba(123, 123, 123, 0.4)',
    },
    color: {
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
      gradient: {
        block: 'linear-gradient(149.02deg, #86d1ff -11.95%, #bbd6fd 89.7%, #c5d7fd 89.71%, #c5d7fd 89.73%)',
      },
    },
    fontFamily: {
      cairoBold: 'Cairo Bold',
      cairoRegular: 'Cairo Regular',
    },
    fontSize: {
      xs: '1.2rem',
      sm: '1.4rem',
      md: '1.6rem',
      lg: '1.8rem',
      xl: '2.4rem',
    },
    letterSpacing: {
      xs: '.2rem',
      sm: '.4rem',
      md: '.6rem',
      lg: '.8rem',
      xl: '1rem',
    },
    lineHeight: {
      xs: '.2rem',
      sm: '.4rem',
      md: '.6rem',
      lg: '.8rem',
      xl: '1rem',
    },
    space: {
      xs: '.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '2.5rem',
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
      controls: 100,
      notification: 300,
    },
  },
};

export default theme;
