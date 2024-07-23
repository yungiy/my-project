import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    width: 100vw;
    overflow-x: hidden;
  }
  
  html, body {
    max-width: 100%;
    min-height: 100%;
    font-size: 16px;
  }

  @media (min-width: 768px) {
    html, body {
      font-size: 16px;
    }
  }

  @media (max-width: 767px) {
    html, body {
      font-size: 16px;
    }
  }
`;

export default GlobalStyles;
