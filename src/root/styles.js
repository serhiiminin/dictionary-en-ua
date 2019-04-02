import { createGlobalStyle } from 'styled-components';
import cairoRegularWoff from '../fonts/cairo-regular.woff';
import cairoRegularWoff2 from '../fonts/cairo-regular.woff2';

const GlobalStyle = createGlobalStyle`
body {
  overflow-x: hidden;
  color: ${props => props.theme.main.colors.text};
  font-size: 14px;
  margin: 0;
} 
* {
  box-sizing: border-box !important;
  font-family: "Cairo", sans-serif;
}
@font-face {
  font-family: "Cairo";
  src: url(${cairoRegularWoff}) format(woff), url(${cairoRegularWoff2}) format(woff2);
}
`;

export default GlobalStyle;
