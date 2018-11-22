const styles = theme => ({
  notifications: {
    width: '300px',
    height: '0',
    position: 'fixed',
    right: theme.main.padding.medium,
    top: theme.main.padding.medium,
    zIndex: theme.main.zIndex.notification,
    padding: 0,
    margin: 0,
  },
});

export default styles;
