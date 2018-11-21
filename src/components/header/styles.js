const styles = theme => ({
  header: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    padding: `${theme.main.padding.large} 0`,
  },
  headerLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    fontSize: '1.6rem',
  }
});

export default styles;
