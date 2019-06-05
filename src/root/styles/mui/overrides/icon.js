export default theme => ({
  MuiSvgIcon: {
    root: {
      fontSize: theme.main.fontSize.md,
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
});
