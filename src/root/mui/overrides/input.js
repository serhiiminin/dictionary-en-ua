export default theme => ({
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
  MuiFormControl: {
    root: {
      width: '100%',
    },
  },
  MuiFormHelperText: {},
  MuiInput: {},
  MuiOutlinedInput: {},
  MuiInputLabel: {},
});
