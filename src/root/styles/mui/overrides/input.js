export default theme => ({
  MuiOutlinedInput: {
    root: {
      transition: theme.main.transition.base,
      fontSize: theme.main.fontSize.sm,
      '& $notchedOutline': {
        borderColor: theme.main.color.main,
      },
      '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
        borderColor: theme.main.color.main,
      },
      '&$focused $notchedOutline': {
        borderWidth: 1,
      },
    },
    input: {
      padding: `${theme.main.space.lg} ${theme.main.space.xl}`,
    },
    notchedOutline: {
      borderRadius: theme.main.borderRadius.md,
    },
  },
  MuiInputLabel: {
    root: {
      fontSize: theme.main.fontSize.sm,
      '&$focused': {
        color: theme.main.color.main,
      },
    },
    outlined: {
      transform: `translate(${theme.main.space.xl}, ${theme.main.space.lg}) scale(1)`,
    },
  },
});
