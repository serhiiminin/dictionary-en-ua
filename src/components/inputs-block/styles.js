import { stylesVariables } from '../../constants/styles-variables';

const styles = {
  inputsBlock: {
    marginBottom: '10px',
    padding: '10px',
    border: `1px solid ${stylesVariables.colors.line}`,
    borderRadius: stylesVariables.borderRadius.small,
  },
  topLine: {
    display: 'grid',
    padding: '5px 0',
    gridTemplateColumns: 'repeat(2, 1fr)',
    justifyContent: 'space-between',
  },
  blockTitle: {
    margin: 0,
  },
  blockItems: {
    minHeight: '2em',
  },
};

export default styles;
