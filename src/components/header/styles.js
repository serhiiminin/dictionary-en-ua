const styles = theme => ({
  header: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    padding: `${theme.main.padding.large} 0`,
  },
  headerLink: {
    color: theme.main.colors.text,
    textDecoration: 'none',
    fontSize: '1.5rem',
  }
});

export default styles;
