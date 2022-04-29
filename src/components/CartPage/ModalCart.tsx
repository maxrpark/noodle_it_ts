import React from 'react';
import styled from 'styled-components';
import { LogInComponent, CartDetails } from '../../components';

const ModalCart: React.FC = () => {
  return (
    <Wrapper>
      <LogInComponent />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;
export default ModalCart;
