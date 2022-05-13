import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';

const ToogleTheme: React.FC = () => {
  const { toogleTheme, theme } = useGlobalContext();

  return (
    <Wrapper>
      <div className='dark-mode-btn'>
        <input
          type='checkbox'
          defaultChecked={theme === 'dark'}
          className='checkbox'
          id='checkbox'
        />
        <label htmlFor='checkbox' className='label' onClick={toogleTheme}>
          <BsFillSunFill className='theme-icon' />
          <BsFillMoonStarsFill className='theme-icon' />
          <div className='ball'></div>
        </label>
      </div>
    </Wrapper>
  );
};

export default ToogleTheme;

const Wrapper = styled.div`
  /* darkMode */

  .label {
    background: ${(props) => props.theme.secondaryColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-radius: 50px;
    height: 26px;
    width: 50px;
    padding: 5px;
  }
  .theme-icon {
    color: #f1c40f;
  }
  .checkbox {
    display: none;
  }
  .checkbox:checked + .label .ball {
    transform: translateX(22px);
  }
  .ball {
    height: 22px;
    width: 20px;
    background: ${(props) => props.theme.mainColor};
    position: absolute;
    border-radius: 50%;
    transition: all 0.3s linear;
  }
  .label i {
    color: #f1c40f;
  }
  /* @media screen and (min-width: 678px) { */
  .dark-mode-btn {
    margin: 1rem;
    margin-top: 2rem;
    /* } */
  }
`;
