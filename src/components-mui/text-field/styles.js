const styles = theme => ({
  textFieldControl: {
    display: 'grid',
    rowGap: '0.5rem',
    columnGap: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridTemplateColumns: '100fr 1fr',
  },
  textField: {
    marginBottom: theme.main.margin.medium,
  },
  root: {
    width: '100%',
  },
  label: {
    color: `${theme.main.colors.text} !important`,
    opacity: 0.7,
  },
  underline: {
    '&:after': {
      borderBottom: `${theme.main.colors.text} !important`,
    },
  },
});

export default styles;
