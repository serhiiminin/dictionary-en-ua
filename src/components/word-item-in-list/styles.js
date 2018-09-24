import { stylesVariables } from '../../constants/styles-variables';

const styles = {
  word: {
    listStyle: 'none',
    display: 'grid',
    gridTemplateColumns: '1fr 18fr 4fr 1fr',
    alignContent: 'center',
    background: stylesVariables.colors.background,
    padding: '5px 10px',
    gap: '1rem',
  },
  wordChosen: {
    background: stylesVariables.colors.line,
  },
  wordText: {
    display: 'flex',
    alignItems: 'center',
  },
  linkToWord: {
    color: stylesVariables.colors.button,
  },
  wordTime: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
};

export default styles;
