const styles = theme => ({
  formAdd: {
    display: 'grid',
    gridTemplateColumns: '3fr 5fr',
    rowGap: '1rem',
    columnGap: '1rem',
  },
  addExample: {
    display: 'grid',
    padding: `${theme.main.padding.medium} 0`,
    justifyContent: 'end',
    alignItems: 'center',
  }
});

export default styles;
