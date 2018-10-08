const styles = theme => ({
  root: {
    width: '100%',
    '&:hover': {
      background: `${theme.main.colors.button} !important`,
      color: `${theme.main.colors.background} !important`,
    },
  },
  selected: {
    background: `${theme.main.colors.button} !important`,
    color: `${theme.main.colors.background} !important`,
  },
});

export default styles;
