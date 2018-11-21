const styles = theme => ({
  notification: {
    width: '100%',
    borderRadius: theme.main.borderRadius.small,
    padding: theme.main.padding.medium,
    marginBottom: theme.main.margin.medium,
    listStyle: 'none',
    transition: `all ${theme.main.timeout.notification}ms ease-in-out`,
    opacity: '1 !important',
    background: props => theme.main.colors.notification[props.type],
  },
  topLine: {
    display: 'grid',
    alignItems: 'center',
    gridAutoFlow: 'column',
    marginBottom: theme.main.margin.medium,
  },
  typeText: {
    fontWeight: 'bold',
  },
  wrapperCloseButton: {
    textAlign: 'right',
  },
});

export default styles;
