import texture from '../images/texture.png';
import theme from './themes';

const styles = {
  '@global body': {
    overflowX: 'hidden',
    background: `${theme.main.colors.background} url(${texture}) center repeat`,
    color: theme.main.colors.text,
    fontSize: '1em',
  },
  '@global *': {
    boxSizing: 'border-box',
  },
};

export default styles;
