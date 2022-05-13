import React from 'react';
import styled from 'styled-components';
import { LogInComponent, RegisterComponent } from '../../components';
import { useGlobalContext } from '../../context/globalContext';
import { useUserContext } from '../../context/userContext';
const showBTN = true;
const ModalCart: React.FC = () => {
  const { closeModal } = useGlobalContext();
  const { isRegistrationForm } = useUserContext();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLInputElement).classList.contains('main-wrapper')) {
      closeModal();
    }
  };
  return (
    <Wrapper onClick={(e) => handleClick(e)} className='main-wrapper'>
      {!isRegistrationForm ? (
        <LogInComponent showBTN={showBTN} />
      ) : (
        <RegisterComponent showBTN={showBTN} />
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;
export default ModalCart;
