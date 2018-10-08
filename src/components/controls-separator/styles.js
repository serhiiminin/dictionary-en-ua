const styles = theme => ({
  alignControls: {
    display: 'grid',
    alignContent: 'center',
    gridAutoFlow: 'column',
    padding: `${theme.main.padding.medium} 0`,
    justifyContent: 'start',
    columnGap: '.5rem',
    rowGap: '.5rem',
  },
  left: {
    justifyContent: 'start',
  },
  center: {
    justifyContent: 'center',
  },
  right: {
    justifyContent: 'end',
  }
});

export default styles;
