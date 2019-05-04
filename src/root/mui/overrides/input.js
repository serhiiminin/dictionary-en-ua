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
      '&$focused $notchedOutline': {
        borderWidth: 1,
      },
    },
    input: {
      padding: `${theme.main.padding.large} ${theme.main.padding.extraLarge}`,
      lineHeight: 1.5,
    },
    notchedOutline: {
      borderRadius: theme.main.borderRadius.medium,
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
      transform: `translate(${theme.main.padding.extraLarge}, ${theme.main.padding.large}) scale(1)`,
      lineHeight: 1.5,
    },
  },
});
