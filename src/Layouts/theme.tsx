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

  linkColors: 'var(--special-color-1)',
};

export const darkthem: DefaultTheme = {
  mainColor: 'var(--main-dark-color-2)',
  arrow: 'white',
  textColor: 'var(--text-color-dark-theme)',
  secondaryColor: 'var(--main-light-color-3)',
  specialColor: 'var(--special-color-1)',
  cardColor: 'var(--main-dark-color-1)',
  linkColors: 'var(--special-color-1)',
};

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-white-1: #fff;
  --color-black-1: #1d1d1d;
  --btn-color: #5469d4;
  --border-radius-1: 5px;
  --border-radius-2: 10px;
  --box-shadow-1: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  --box-shadow-2: rgba(0, 0, 0, 0.2) 0px 6px 15px;
  --transition-1: all 0.3s ease-in-out;
  --primary-font-family: 'Poppins', sans-serif;

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
#app{
  position: relative;
  min-height: 100vh;
}
body{
  background: ${(props) => props.theme.mainColor};
  font-family: var(--primary-font-family);
  transition: all 0.3s ease-in-out;
  color: ${(props) => props.theme.textColor}
  
}
.icons{
   pointer-events: none;
   font-size: 10px;
}

.description{
 color: ${(props) => props.theme.textColor}
 
}
.arrow{
  border-color: ${(props) => props.theme.textColor} !important;
  cursor: pointer;
}


/* Globals */
a {
  text-decoration: none;
  color: ${(props) => props.theme.textColor};
}
.link{
  color: ${(props) => props.theme.linkColors};
  :hover{
    opacity: 0.8;
  }
}
li {
  list-style: none;
}

.img {
  width: 100%;
}

.page-100 {
  min-height: calc(100vh - 450px);
}
.loading{
  height: 100vh;
}
.center{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


@media screen and (min-width: 768px) {
  .main-section {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    gap: 2rem;
  }

  .section-center {
  max-width: 1200px;
  margin: 1rem auto;
  padding: 1rem;
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

  background: var(--btn-color);
  font-family: Arial,sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgb(0 0 0 / 7%);
  /* width: 100%; */

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
  font-size: .9rem;
  font-weight: bold;
  background: #000;
  padding: 0.2rem 0.3rem;
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  -webkit-transition: var(--transition-1);
  transition: var(--transition-1);
  display: flex;
  justify-content: center;
  align-items: center;
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
.bibimmyeon {
  background: rgba(5, 113, 110, 0.821);
}
.spicy {
  background: #ff0000de;
}

/* heart */
.heart {
  color: crimson;
  font-size: 2rem;
      display: flex;
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

  .form-btn:hover {
    transform: translateY(0);
  }
  .form-link{
    text-align: center;
  }
  .form-link a{
    color: var(--special-color-1);
  }

  .container{
    display: flex;
    gap: 1rem;
    flex-direction: column;
    padding: 1rem;
  }


  // noodles cards
  .cards-layout{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  place-content: center;
  gap:1rem;
  width: 100%;
  padding: 1rem;
  height: 100%;
  }
  

 .single-card {
    width: 100%;
    /* height: 250px; */
    box-shadow: var(--box-shadow-1);
    border-radius: 5px;
    transition: var(--transition-1);
    background: ${(props) => props.theme.cardColor};
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    overflow: hidden;
    margin: 0 auto;
    :hover {
      box-shadow: var(--box-shadow-2);
      transform: translate(0, -2px);
    }
  }
    .card-img {
    width: 100%;
    height: 200px;
    /* max-height:250px; */
    object-fit: cover;
    justify-self: flex-start;
    transition: var(--transition-1);
    overflow: hidden;
  
  }

    .info {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    position: relative;
  }

    .bottom__details {
    text-transform: capitalize;
  }

    @media screen and (min-width: 960px) {
    
    .cards-layout-1{
       grid-template-columns: 1fr 1fr 1fr;
    }

    .cards-layout-1 .card-0 {
          grid-column: 1 / 3;
       }
    .cards-layout-1 .card-1 {
          grid-column: 3 / 4;
          grid-row: 1 / 2;
       }
    .cards-layout-1 .card-2 {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
       }
    .cards-layout-1 .card-3 {
          grid-column: 2 / 4;
          grid-row: 2 / 3;
       }

    // layout 2

    .cards-layout-2{
       grid-template-columns: 1fr 1fr 1fr;
    }

    .cards-layout-2 .card-0 {
          grid-column: 1 / 2;
       }
    .cards-layout-2 .card-1 {
          grid-column: 2 / 4;
          grid-row: 1 / 2;
       }
    .cards-layout-2 .card-2 {
          grid-column: 1 / 3;
          grid-row: 2 / 3;
       }
    .cards-layout-2 .card-3 {
          grid-column: 3 / 4;
          grid-row: 2 / 3;
       }
  }


// order 
  .order-date,
  .see-order {
    text-align: center;

  }
  .see-order {
    justify-self: flex-end;
    color: var(--special-color-1);
  }


  // detail section

  .detail-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .link {
    margin: 1rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }


//sidebar
 .hidde-sidebar {
    left: -100% !important;
  }
`;
