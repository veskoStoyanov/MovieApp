import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
:root {
     --main-green-color: green;
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}

body {
   height: 100vh;
   width: 100%;  
}

input:focus, textarea:focus{
    outline: none;
}
`;
