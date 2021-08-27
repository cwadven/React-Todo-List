import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    margin: 10px auto;
`;

const Ring = styled.div`
  margin-top: 50px;
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #faf3e0;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #faf3e0 transparent transparent transparent;

  &:nth-of-type(1) {
    animation-delay: -0.45s;
  }
  &:nth-of-type(2) {
    animation-delay: -0.3s;
  }
  &:nth-of-type(3) {
    animation-delay: -0.15s;
  }
  
  @keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = () => {
    return (
        <Container>
            <Ring />
            <Ring />
            <Ring />
            <Ring />
        </Container>
    );
};

export default Loader;
