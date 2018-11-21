const styles = theme => ({
  paginationPanel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, auto))',
    justifyContent: 'end',
    gap: '1rem',
    background: theme.main.colors.background,
    padding: '10px 10px',
    width: '100%',
  }
});

export default styles;
