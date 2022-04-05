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
    color: ${(props) => props.theme.textColor};
    background-color: var(--primary-color-4);
    display: grid;
    place-content: center;
    margin-top: 2rem;
    gap: 0.5rem;
    text-align: center;
  }
  footer a {
    color: var(--primary-white);
    text-decoration: underline;
  }
  footer a:hover {
    color: var(--primary-color-2);
    letter-spacing: normal;
  }
`;
