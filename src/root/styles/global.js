import { createGlobalStyle } from 'styled-components';
import cairoRegularEot from '../fonts/cairo-regular.eot';
import cairoRegularSvg from '../fonts/cairo-regular.svg';
import cairoRegularTtf from '../fonts/cairo-regular.ttf';
import cairoRegularWoff from '../fonts/cairo-regular.woff';
import cairoRegularWoff2 from '../fonts/cairo-regular.woff2';
import cairoBoldEot from '../fonts/cairo-bold.eot';
import cairoBoldSvg from '../fonts/cairo-bold.svg';
import cairoBoldTtf from '../fonts/cairo-bold.ttf';
import cairoBoldWoff from '../fonts/cairo-bold.woff';
import cairoBoldWoff2 from '../fonts/cairo-bold.woff2';

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

@font-face {
    font-family: 'Cairo Bold';
    src: url(${cairoBoldEot});
    src: url(${cairoBoldEot}) format('embedded-opentype'),
         url(${cairoBoldWoff2}) format('woff2'),
         url(${cairoBoldWoff}) format('woff'),
         url(${cairoBoldTtf}) format('truetype'),
         url(${cairoBoldSvg}#CairoRegular) format('svg');
}
:root {
  font-size: 62.5%;
}
body {
  overflow-x: hidden;
  color: ${props => props.theme.main.color.text};
  font-family: ${props => props.theme.main.fontFamily.cairoRegular}, sans-serif;
  margin: 0;
} 
* {
  box-sizing: border-box;
}
`;

export default GlobalStyle;
