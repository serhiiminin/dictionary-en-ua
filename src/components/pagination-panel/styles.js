import { stylesVariables } from '../../constants/styles-variables';

const styles = {
  paginationPanel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(0, auto))',
    justifyContent: 'end',
    gap: '1rem',
    background: stylesVariables.colors.background,
    padding: '10px 10px',
  }
};

export default styles;
