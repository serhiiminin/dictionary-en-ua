import { createGlobalStyle } from "styled-components";
import texture from "../images/texture.png";
import theme from "./mui-theme";

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
    background: ${theme.palette.background.paper} url(${texture}) center repeat;
    color: ${theme.palette.text.primary};
    font-size: 1em;
  }
  * {
    box-sizing: border-box;
  }
  `;

export default GlobalStyle;
