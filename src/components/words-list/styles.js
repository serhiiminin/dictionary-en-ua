import { stylesVariables } from '../../constants/styles-variables';

const styles = {
  myWords: {},
  wordsList: {
    margin: 0,
    padding: 0,
    background: stylesVariables.colors.text,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'grid',
    rowGap: '1px',
  },
  toolbar: {
    listStyle: 'none',
    display: 'grid',
    gridTemplateColumns: '1fr 22fr 1fr',
    alignContent: 'center',
    background: stylesVariables.colors.background,
    padding: '10px 10px',
  },
  toolbarButtons: {
    display: 'grid',
    justifyContent: 'center',
  },
  word: {
    listStyle: 'none',
    display: 'grid',
    gridTemplateColumns: '1fr 20fr 2fr 1fr',
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
  }
};

export default styles;
