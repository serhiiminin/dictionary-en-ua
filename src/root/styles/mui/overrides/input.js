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
      padding: `${theme.main.spaces.lg} ${theme.main.spaces.xl}`,
    },
    notchedOutline: {
      borderRadius: theme.main.borderRadius.md,
    },
  },
  MuiInputLabel: {
    root: {
      '&$focused': {
        color: theme.main.colors.main,
      },
    },
    outlined: {
      transform: `translate(${theme.main.spaces.xl}, ${theme.main.spaces.lg}) scale(1)`,
    },
  },
});
