const styles = theme => ({
  inputsBlock: {
    display: "grid",
    rowGap: "1em",
    marginBottom: "10px",
    padding: "10px",
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: theme.main.borderRadius.small,
    background: theme.palette.background.paper,
  },
  topLine: {
    display: "grid",
    padding: "5px 0",
    gridTemplateColumns: "repeat(2, 1fr)",
    justifyContent: "space-between",
    alignItems: "center"
  },
  blockTitle: {
    margin: 0
  },
  blockItems: {
    minHeight: "2em"
  }
});

export default styles;
