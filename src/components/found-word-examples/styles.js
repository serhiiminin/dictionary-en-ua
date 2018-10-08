const styles = theme => ({
  examplesTitle: {
    margin: `0 0 ${theme.main.margin.medium}`,
    padding: 0,
  },
  exampleItem: {
    background: theme.main.colors.line,
    padding: theme.main.padding.medium,
    marginBottom: theme.main.margin.small,
    borderRadius: theme.main.borderRadius.small,
  },
  noResults: {
    fontStyle: 'italic',
    opacity: theme.main.opacity.disabled,
  }
});

export default styles;
