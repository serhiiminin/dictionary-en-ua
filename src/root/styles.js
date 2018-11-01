import { createGlobalStyle } from "styled-components";
import texture from "../images/texture.png";
import theme from "./themes";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
    background: ${theme.main.colors.background} url(${texture}) center repeat;
    color: ${theme.main.colors.text};
    font-size: 1em;
  }
  * {
    box-sizing: border-box;
  }
  `;

export default GlobalStyle;
