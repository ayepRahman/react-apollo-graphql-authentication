import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

body {
    background-color: #fafafa;
    font-family: 'Open Sans', sans-serif;
    margin: 0;
  }
`;

export { GlobalStyle };
