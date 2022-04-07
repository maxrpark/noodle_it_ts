import { createGlobalStyle } from 'styled-components';
import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    arrow: string;
    mainColor: string;
    secondaryColor: string;
    textColor: string;
    specialColor: string;
    cardColor: string;
    linkColors: string;
  }
}

export const lightTheme: DefaultTheme = {
  mainColor: 'var(--main-light-color-1)',
  arrow: 'black',
  textColor: 'black',
  secondaryColor: 'var(--main-dark-color-3)',
  specialColor: 'var(--special-color-1)',
  cardColor: 'var( --primary-white)',

  linkColors: '',
};

export const darkthem: DefaultTheme = {
  mainColor: 'var(--main-dark-color-2)',
  arrow: 'white',
  textColor: 'var(--text-color-dark-theme)',
  secondaryColor: 'var(--main-light-color-3)',
  specialColor: 'var(--special-color-1)',
  cardColor: 'var(--main-dark-color-1)',
  linkColors: '',
};

export const GlobalStyle = createGlobalStyle`

:root {
  --color-black-1: #1d1d1d;
  --border-radius-1: 5px;
  --border-radius-2: 10px;
  --box-shadow-1: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  --box-shadow-2: rgba(0, 0, 0, 0.2) 0px 6px 15px;
  --transition-1: all 0.3s ease-in-out;

  /* theme */
  --backgroung-color: #eeebd0;
  --color-primary: #ffffff;
  --dark-background: #1d1d1d;
  --primary-white: #ffffff;

  --main-dark-color-1: #1d1d1d;
  --main-dark-color-2: #333333;
  --main-dark-color-3: #4d4d4d;

  --main-light-color-1: #eeebd0;
  --main-light-color-2: #f5f5f5;
  --main-light-color-3: #e5e5e5;

  --special-color-1: crimson;
  --special-color-2: crimson;

  --text-color-light-theme: #ffffff;
  --text-color-dark-theme: #918f8f;
}

body{
  background: ${(props) => props.theme.mainColor};
  transition: all 0.3s ease-in-out;
  color: ${(props) => props.theme.textColor}
}

.description{
 color: ${(props) => props.theme.textColor}
 
}
.arrow{
  border-color: ${(props) => props.theme.textColor} !important;
  cursor: pointer;
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



/* Globals */
a {
  text-decoration: none;
  color: ${(props) => props.theme.textColor};
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin:1rem ;
}

@media screen and (min-width: 768px) {
  .main-section {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    gap: 2rem;
  }
}

/* BTN */
.btn{
  background: ${(props) => props.theme.secondaryColor};
  padding: 1rem;
  border-radius: var(--border-radius-1);
  color: ${(props) => props.theme.mainColor};
  box-shadow: var(--box-shadow-1);
  transition: var(--transition-1);

  :hover {
    box-shadow: var(--box-shadow-2);
    transform: translateY(-3px);
  }
  :active{
    box-shadow: var(--box-shadow-1);
    transform: translateY(-2px);
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

// form

.user-form {
    display: flex;
    flex-direction: column;
    background: ${(props) => props.theme.cardColor};
    padding: 2rem;
    width: 100%;
    max-width: 600px;
    gap: 1rem;
  }

  .form-control {
    display: flex;
    flex-direction: column;
  }
  .form-control label {
    align-self: center;
    margin-bottom: 0.5rem;
  }
  .form-control input {
    height: 37px;
  }
  .form-btn {
    justify-self: flex-start;
    border: none;
    height: 35px;
    transition: all 0.3s linear;
  }
  .form-btn:hover {
    background: ${(props) => props.theme.secondaryColor};
  }
  .form-link{
    text-align: center;
  }
  .form-link a{
    color: var(--special-color-1);
  }
`;