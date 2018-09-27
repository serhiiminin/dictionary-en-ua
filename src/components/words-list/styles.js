import { stylesVariables } from '../../constants/styles-variables';

const styles = {
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
    justifyContent: 'start',
    alignItems: 'center',
  },
};

export default styles;
