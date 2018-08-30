import { stylesVariables } from '../defaults/styles-variables';
import texture from '../images/texture.png';

const styles = {
  '@global body': {
    overflowX: 'hidden',
    backgroundColor: stylesVariables.colors.background,
    backgroundImage: `url(${texture})`,
    background: `${stylesVariables.colors.background} url(${texture}) center repeat`,
    color: stylesVariables.colors.text,
  },
  '@global *': {
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif !important',
  },
};

export default styles;
