const styles = theme => ({
  imageBlock: {
    padding: `${theme.main.padding.medium} 0`,
    width: props => `${props.width}px`,
    height: props => `${props.height}px`,
    background: props => `url(${props.src}) 50% 50% / cover no-repeat`,
    borderRadius: theme.main.borderRadius.small
  }
});

export default styles;
