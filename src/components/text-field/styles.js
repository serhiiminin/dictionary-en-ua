const styles = theme => ({
  textFieldControl: {
    display: props => (props.control ? 'grid' : 'initial'),
    rowGap: props => (props.control ? '.5rem' : 'initial'),
    columnGap: props => (props.control ? '1rem' : 'initial'),
    justifyContent: props => (props.control ? 'space-between' : 'initial'),
    alignItems: props => (props.control ? 'center' : 'initial'),
    gridTemplateColumns: props => (props.control ? '100fr 1fr' : 'initial'),
    marginBottom: props => (props.control ? 'initial' : theme.main.margin.medium),
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
