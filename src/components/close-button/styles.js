const styles = theme => ({
  closeButton: {
    background: 'transparent',
    color: theme.main.colors.text,
    padding: 0,
    border: 0,
    borderRadius: '50%',
    fontSize: '.81em',
    outline: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export default styles;
