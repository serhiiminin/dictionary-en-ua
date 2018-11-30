const styles = theme => ({
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    padding: `${theme.main.padding.large} 0`,
    alignItems: 'center',
  },
  headerLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    fontSize: '1.6rem',
  }
});

export default styles;
