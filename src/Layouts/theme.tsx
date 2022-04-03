import { createGlobalStyle } from 'styled-components';
import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    arrow: string;
    mainColor: string;
    secondaryColor: string;
    textColor: string;
  }
}

export const lightTheme: DefaultTheme = {
  mainColor: 'var(--main-light-color-1)',
  arrow: 'black',
  textColor: 'black',
  secondaryColor: 'var(--main-dark-color-1)',
};

export const darkthem: DefaultTheme = {
  mainColor: 'var(--main-dark-color-2)',
  arrow: 'white',
  textColor: 'white',
  secondaryColor: 'var(--main-light-color-2)',
};

export const GlobalStyle = createGlobalStyle`



body{
  background: ${(props) => props.theme.mainColor};
  transition: all 0.3s ease-in-out;
  color: ${(props) => props.theme.textColor}
}

.description{
 color: ${(props) => props.theme.textColor}
 
}
.arrow{
  border-color: ${(props) => props.theme.textColor} !important
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



/* Globals */
a {
  text-decoration: none;
  color: var(--color-black-1);
}
li {
  list-style: none;
}

.img {
  width: 100%;
}
.section-center {
  max-width: 960px;
  margin: 1rem auto;
  padding: 1rem;
}
.page-100 {
  height: 100vh;
  display: grid;
  place-content: center;
}

@media screen and (min-width: 768px) {
  .main-section {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    gap: 2rem;
  }
}
.special-link {
  color: #fff;
  height: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  background: #000;
  padding: 0.2rem 0.7rem;
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  transition: var(--transition-1);
}
.related-links,
.tags-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
}
.related-links {
  margin: 1rem;
  text-transform: capitalize;
}
.related-links a {
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tag {
  display: inline-block;
  background: crimson;
  color: #fff;
  padding: 0.2rem 0.7rem;
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  transition: var(--transition-1);
}
.tag:hover {
  opacity: 0.8;
  box-shadow: var(--box-shadow-2);
  letter-spacing: 0.1rem;
}
.special-link:hover {
  opacity: 0.8;
  box-shadow: var(--box-shadow-2);
}

.vegan {
  background: rgb(59, 147, 59);
}

/* heart */
.heart {
  color: crimson;
  font-size: 2rem;
}
`;
