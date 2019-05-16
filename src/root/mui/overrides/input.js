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
    },
    notchedOutline: {
      borderRadius: theme.main.borderRadius.medium,
    },
  },
  MuiInputLabel: {
    root: {
      '&$focused': {
        color: theme.main.colors.main,
      },
    },
    outlined: {
      transform: `translate(${theme.main.padding.extraLarge}, ${theme.main.padding.large}) scale(1)`,
    },
  },
});
