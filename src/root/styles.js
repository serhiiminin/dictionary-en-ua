import texture from '../images/texture.png';
import theme from './mui-theme';

const GlobalStyle = {
  '@global body': {
    overflowX: 'hidden',
    background: `${theme.main.colors.background} url(${texture}) center repeat`,
    color: theme.main.colors.text,
    fontSize: '1em',
    margin: 0,
  },
  '@global *': {
    boxSizing: 'border-box',
  },
};

export default GlobalStyle;
