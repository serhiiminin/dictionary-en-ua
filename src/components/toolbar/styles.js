const styles = theme => ({
  toolbar: {
    display: 'grid',
    gridTemplateColumns: '1fr 22fr 1fr',
    alignContent: 'center',
    background: theme.main.colors.background,
    padding: '10px 10px',
  },
  toolbarButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, auto))',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
