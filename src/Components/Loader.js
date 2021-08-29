import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Container = styled.div`
    position: relative;
    width: ${props =>
        String(Number(props.size) + Number(props.outerSize) * 2)}px;
    height: ${props =>
        String(Number(props.size) + Number(props.outerSize) * 2)}px;
    margin: ${props => props.margin} auto;
`;

const Ring = styled.div`
  margin-top: 50px;
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: ${props => props.outerSize}px;
  border: ${props => props.outerSize}px solid #faf3e0;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${props => props.color} transparent transparent transparent;

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

const Loader = ({
    size = '64',
    outerSize = '8',
    margin = '10',
    color = '#faf3e0',
}) => {
    return (
        <Container size={size} outerSize={outerSize} margin={margin}>
            <Ring size={size} outerSize={outerSize} color={color} />
            <Ring size={size} outerSize={outerSize} color={color} />
            <Ring size={size} outerSize={outerSize} color={color} />
            <Ring size={size} outerSize={outerSize} color={color} />
        </Container>
    );
};

Loader.propTypes = {
    size: PropTypes.string,
    outerSize: PropTypes.string,
    margin: PropTypes.string,
    color: PropTypes.string,
};

export default Loader;
