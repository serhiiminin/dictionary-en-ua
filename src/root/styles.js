import { variables } from '../styles/variables';

const styles = {
  '@global body': {
    overflowX: 'hidden',
    background: variables.colors.background,
    color: variables.colors.text,
  },
  '@global *': {
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif !important',
  },
};

export default styles;
