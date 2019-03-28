const styles = theme => ({
  alignControls: {
    display: 'grid',
    alignContent: 'center',
    gridAutoFlow: 'column',
    padding: `${theme.main.padding.medium} 0`,
    justifyContent: props => props.align,
    columnGap: '.5rem',
    rowGap: '.5rem',
  },
});

export default styles;
