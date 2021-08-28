import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    position: relative;
    width: ${props =>
        props.size
            ? String(Number(props.size) + Number(props.outerSize) * 2)
            : '80'}px;
    height: ${props =>
        props.size
            ? String(Number(props.size) + Number(props.outerSize) * 2)
            : '80'}px;
    margin: ${props => (props.margin ? props.margin : '10px')} auto;
`;

const Ring = styled.div`
  margin-top: 50px;
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: ${props => (props.size ? props.size : '64')}px;
  height: ${props => (props.size ? props.size : '64')}px;
  margin: ${props => (props.outerSize ? props.outerSize : '8')}px;
  border: ${props => (props.outerSize ? props.outerSize : '8')}px solid #faf3e0;
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

const Loader = ({ size, outerSize, margin }) => {
    return (
        <Container size={size} outerSize={outerSize} margin={margin}>
            <Ring size={size} outerSize={outerSize} />
            <Ring size={size} outerSize={outerSize} />
            <Ring size={size} outerSize={outerSize} />
            <Ring size={size} outerSize={outerSize} />
        </Container>
    );
};

export default Loader;
