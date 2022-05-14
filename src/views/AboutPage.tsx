import { usePageTitle } from '../customHooks/UsePageTitle';
import { PageTitle } from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const AboutPage: React.FC = () => {
  usePageTitle('About');
  return (
    <Wrapper>
      <PageTitle title={'About'} image={''} />
      <div className='page-100 center'>
        <article className='content'>
          <h2>About the project</h2>
          <p>
            Noodle it! is the frontend side of a full-stack project about a
            noodle shop. <br /> The frontend is built with React.js and
            typescript and deployed on netlify and the backend (noodles-API) was
            built with Django and deployed on Heroku.
          </p>
          <p>
            I try to implement as many different things as I could to practice
            and learn deeply React, Typescript and Django.
          </p>
          <h2>Frontend</h2>
          <p>
            As I mentioned the frontend is built with React and typescript, for
            the styles I used styled-components. I used useContext and
            useReducer to manage most of the states of the application which
            made everything simple because the application is quite big.
          </p>
          <p>
            Besides that, I also create a few custumeHooks which were also
            helpful around the app.
          </p>
          <h2>pages</h2>
          <p>Noodle it! has around 14 different pages which are:</p>
          <ul>
            <li>Home</li>
            <li>Dashboard</li>
            <li>Products</li>
            <li>NoodlePage (Single Product)</li>
            <li>
              Listpage
              <li className='nested'>
                Show a list of the result of all categories or brands.
              </li>
            </li>
            <li>
              NoodlesTypePage
              <li className='nested'>
                Show a list of all noodles corresponding to a certain brand,
                category, or tag.
              </li>
            </li>
            <li>Search</li>
            <li>Order</li>
            <li>Cart</li>
            <li>Checkout</li>
            <li>Login</li>
            <li>Register</li>
            <li>Error</li>
          </ul>
          <p>
            Page About The dashboard and checkout page are only available for
            users that are registered.
          </p>
          <h2>Benefice of registered users </h2>
          <p>
            Besides being able to complete their purchase, registered users have
            also access to their dashboard page.
          </p>
          <p>Also, registered users can mark single noodles as favorites.</p>
          <h3> Dashboard Page</h3>
          <p>
            On the Dashboard page the user can find their orders, and
            wishlist(favorites noodles), and if he or she has items in the cart,
            can also see them there.
          </p>
          <h2> Search Page</h2>
          <p>
            I mostly create this page to make use of one of the endpoints of the
            API.
          </p>
          <h2> Dark mode</h2>
          <p>
            The application also has a light and dark theme which is basic but I
            implemented it so I could learn how to use ThemeProvider from
            styled-components.
          </p>
          <h2>Payment getaway</h2>
          <p>
            For the payment I used stripe, it was my first time implementing
            something like this, and it turned out to be quite simple after I
            watched some tutorials but especially because their documentation is
            so clear.
          </p>
          <h2>Ideas</h2>
          <p>
            Some of the inspiration for the website, like the sidebar, wishlist,
            and checkout page are coming from the Udemy website.
          </p>
          <h2>My NPM packages</h2>
          <p>
            In this application I had use my two npm packages,{' '}
            <a
              className='link'
              href='https://www.npmjs.com/package/@maxcoding/simpleslider'
              target={'_blank'}
            >
              SimpleSlider
            </a>{' '}
            for the carrousel in
            <Link className='link' to={`/noodle/jeong-myeon`}>
              {' '}
              SINGLE NOODLE PAGE
            </Link>
            , and
            <a
              className='link'
              href='https://www.npmjs.com/package/simplereview'
              target={'_blank'}
            >
              {' '}
              SimpleReview
            </a>{' '}
            also in the single noodle page and in the card component.
          </p>
          <h2>Backend</h2>
          <p>
            The backend of the project is created using python. The main idea
            was to create the API, which is available for everyone to use it.
          </p>
          <p>
            You can visit the API{' '}
            <a
              className='link'
              href='https://noodles-api.herokuapp.com/'
              target={'_blank'}
            >
              HERE
            </a>
            , to know more about it.
          </p>

          <h2>Learn more about it</h2>
          <p>
            These are only few things included in the project that just come to
            my mind now
          </p>
          <p>
            if you want to know more about it, please take a look the the two
            repositories
          </p>
          <p>
            Noodle it:{'  '}
            <a
              className='link'
              href='https://github.com/maxrpark/noodle_it_ts'
              target={'_blank'}
            >
              Visit
            </a>
          </p>
          <p>
            Noodles-api:{'  '}
            <a
              className='link'
              href='https://github.com/maxrpark/nooodles_api'
              target={'_blank'}
            >
              Visit
            </a>
          </p>
        </article>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .content {
    max-width: 960px;
    padding: 1rem;
  }
  h2,
  h3 {
    text-align: center;
    margin: 2rem auto;
    color: #5469d4;
    text-transform: capitalize;
  }
  p {
    margin: 1rem auto;
    line-height: 1.7rem;
    font-size: 1.25rem;
  }
  ul,
  li {
    list-style: circle;
    margin-left: 1rem;
  }
  li {
    font-size: 1.25rem;
    margin-top: 0.5rem;
  }
  .nested {
    margin-left: 1rem;
  }
  .link {
    margin: 0;
  }
`;
export default AboutPage;
