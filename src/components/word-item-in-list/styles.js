const styles = theme => ({
  wordItemWrapper: {
    opacity: props =>
      props.isLoading || props.isChecked ? theme.main.opacity.disabled : 1
  },
  description: {
    padding: `${theme.main.padding.small} 0`
  },
  wordLink: {
    color: theme.palette.primary.main
  },
  wordTime: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: "0.9em"
  }
});

export default styles;
