import stylesVariables from '../../constants/styles-variables';

const styles = {
  word: {
    listStyle: 'none',
    display: 'grid',
    gridTemplateColumns: '1fr 16fr 6fr 1fr',
    alignItems: 'center',
    background: stylesVariables.colors.background,
    padding: '5px 10px',
    gap: '1rem',
  },
  wordChosen: {
    background: stylesVariables.colors.line,
  },
  wordDescription: {
    padding: '5px 0',
  },
  linkToWord: {
    color: stylesVariables.colors.button,
  },
  wordTime: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: '.9em',
  },
  wordLoading: {
    background: stylesVariables.colors.background,
    opacity: stylesVariables.opacity.disabled,
  },
  wordTitle: {
    fontSize: '1em',
  },
  lastLearn: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, auto))',
    justifyContent: 'start',
    fontSize: '0.85em',
    opacity: stylesVariables.opacity.disabled,
    gap: '0.25em',
  }
};

export default styles;
