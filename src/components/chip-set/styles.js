const styles = theme => ({
  chipSet: {
    display: 'flex',
    flexFlow: 'row wrap',
    transition: theme.main.transition
  },
  chip: {
    marginBottom: theme.main.margin.small,
    marginRight: theme.main.margin.small,
  }
});

export default styles;
