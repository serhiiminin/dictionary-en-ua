const styles = theme => ({
  word: {
    listStyle: 'none',
    display: 'grid',
    gridTemplateColumns: '1fr 16fr 6fr 1fr',
    alignItems: 'center',
    background: theme.main.colors.background,
    padding: '5px 10px',
    gap: '1rem',
  },
  wordChosen: {
    background: theme.main.colors.line,
  },
  wordDescription: {
    padding: '5px 0',
  },
  linkToWord: {
    color: theme.main.colors.button,
  },
  wordTime: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: '.9em',
  },
  wordLoading: {
    background: theme.main.colors.background,
    opacity: theme.main.opacity.disabled,
  },
  wordTitle: {
    fontSize: '1em',
  },
  lastLearn: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, auto))',
    justifyContent: 'start',
    fontSize: '0.85em',
    opacity: theme.main.opacity.disabled,
    gap: '0.25em',
  }
});

export default styles;
