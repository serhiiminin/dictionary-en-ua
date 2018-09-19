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
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, auto))',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countPerPage: {
    width: '150px',
  },
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
  }
};

export default styles;
