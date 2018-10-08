const styles = theme => ({
  lineExplanation: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    background: theme.main.colors.line,
    padding: theme.main.padding.medium,
    marginBottom: theme.main.margin.medium,
    borderRadius: theme.main.borderRadius.small,
  },
});

export default styles;
