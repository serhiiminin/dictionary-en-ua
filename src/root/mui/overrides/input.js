export default theme => ({
  MuiTextField: {
    root: {
      width: '100%',
    },
  },
  MuiFormControl: {
    root: {
      width: '100%',
    },
  },
  MuiFormHelperText: {},
  MuiInput: {},
  MuiOutlinedInput: {
    root: {
      '& $notchedOutline': {
        borderColor: theme.main.colors.main,
      },
    },
    input: {
      padding: '15px 25px',
    },
    notchedOutline: {
      borderRadius: '8px',
    },
  },
  MuiFormInput: {},
  MuiInputLabel: {
    root: {
      '&$focused': {
        color: theme.main.colors.main,
      },
    },
    outlined: {
      transform: 'translate(25px, 15px) scale(1)',
    },
  },
});
