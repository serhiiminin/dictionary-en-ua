import { stylesVariables } from '../../constants/styles-variables';

const styles = {
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
