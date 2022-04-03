import { createGlobalStyle } from 'styled-components';
import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    arrow: string;
    body: string;
    textColor: string;
  }
}

export const lightTheme: DefaultTheme = {
  body: 'var(--backgroung-color)',
  arrow: 'black',
  textColor: 'black',
};

export const darkthem: DefaultTheme = {
  body: 'var(--dark-background)',
  arrow: 'white',
  textColor: 'white',
};

export const GlobalStyle = createGlobalStyle`
body{
  background: ${(props) => props.theme.body};
  transition: all 0.3s ease-in-out;
  color: ${(props) => props.theme.textColor}
}

.description{
 color: ${(props) => props.theme.textColor}
}
.arrow{
  border-color: ${(props) => props.theme.textColor} !important
}
`;
