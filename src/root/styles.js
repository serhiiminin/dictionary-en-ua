import theme from './mui-theme';
import cairoRegularWoff from '../fonts/cairo-regular.woff';
import cairoRegularWoff2 from '../fonts/cairo-regular.woff2';

const GlobalStyle = {
  '@global body': {
    overflowX: 'hidden',
    background: theme.main.colors.background,
    color: theme.main.colors.text,
    fontSize: '1em',
    margin: 0,
  },
  '@global *': {
    boxSizing: 'border-box',
    fontFamily: '"Cairo", sans-serif',
  },
  '@font-face': {
    fontFamily: '"Cairo"',
    src: `url(${cairoRegularWoff})`,
    fallbacks: [{ src: `url(${cairoRegularWoff}) format(woff)` }, { src: `url(${cairoRegularWoff2}) format(woff2)` }],
  },
};

export default GlobalStyle;
