const styles = theme => ({
  foundImage: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '250px',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  foundImageInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: theme.main.colors.line,
    opacity: theme.main.opacity.disabled,
    display: 'grid',
    alignContent: 'center',
    justifyContent: 'center',
  }
});

export default styles;
