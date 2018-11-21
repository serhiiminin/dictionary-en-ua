const styles = theme => ({
  button: {
    opacity: props => (props.isActive ? theme.main.opacity.disabled : 1),
    color: theme.palette.background.paper
  }
});

export default styles;
