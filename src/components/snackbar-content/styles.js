const styles = theme => ({
  snackbar: {
    backgroundColor: props => theme.main.colors.notification[props.variant]
  },
  icon: {
    fontSize: 20,
    color: theme.palette.text.primary
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
  },
});

export default styles;
