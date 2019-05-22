export default theme => ({
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
});
