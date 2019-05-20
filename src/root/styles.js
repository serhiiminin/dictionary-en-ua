import { createGlobalStyle } from 'styled-components';
import cairoRegularEot from '../fonts/cairo-regular.eot';
import cairoRegularSvg from '../fonts/cairo-regular.svg';
import cairoRegularTtf from '../fonts/cairo-regular.ttf';
import cairoRegularWoff from '../fonts/cairo-regular.woff';
import cairoRegularWoff2 from '../fonts/cairo-regular.woff2';

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Cairo Regular';
    src: url(${cairoRegularEot});
    src: url(${cairoRegularEot}) format('embedded-opentype'),
         url(${cairoRegularWoff2}) format('woff2'),
         url(${cairoRegularWoff}) format('woff'),
         url(${cairoRegularTtf}) format('truetype'),
         url(${cairoRegularSvg}#CairoRegular) format('svg');
}

body {
  overflow-x: hidden;
  color: ${props => props.theme.main.colors.text};
  font-size: ${props => props.theme.main.fontSizes.sm};
  margin: 0;
} 
* {
  box-sizing: border-box;
  font-family: ${props => props.theme.main.fontFamilies.cairoRegular}, sans-serif;
}
`;

export default GlobalStyle;
