import { variables } from '../styles/variables';
import texture from '../images/texture.png';

const styles = {
  '@global body': {
    overflowX: 'hidden',
    backgroundColor: variables.colors.background,
    backgroundImage: `url(${texture})`,
    background: `${variables.colors.background} url(${texture}) center repeat`,
    color: variables.colors.text,
  },
  '@global *': {
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif !important',
  },
};

export default styles;
