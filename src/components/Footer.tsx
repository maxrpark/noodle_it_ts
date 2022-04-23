import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <footer>
        <p>
          Made with Django, React & TypeScript, by{' '}
          <a
            target='_blank'
            rel='noreferrer'
            href='https://twitter.com/MaxCodeJourney'
          >
            Maxi Ruti,
          </a>{' '}
          {new Date().getFullYear()}
        </p>
        <p>
          Visit my other projects{' '}
          <a
            target='_blank'
            rel='noreferrer'
            href='https://my-portfolio-blog-website.netlify.app/'
          >
            My Portfolio Website
          </a>
        </p>
      </footer>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  /* Footer */
  footer {
    height: 100px;
    /* color: ${(props) => props.theme.textColor}; */
    color: var(--color-white-1);
    background-color: var(--color-black-1);
    /* background-color: ${(props) => props.theme.mainColor}; */
    display: grid;
    place-content: center;
    margin-top: 2rem;
    gap: 0.5rem;
    text-align: center;
  }
  footer a {
    color: crimson;
    text-decoration: underline;
  }
`;
