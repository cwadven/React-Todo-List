import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Loader from '../../Components/Loader';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 80vw;
    max-width: 400px;
    height: 100vw;
    max-height: 500px;
    background: linear-gradient(
        169deg,
        rgba(224, 196, 182, 1) 0%,
        rgba(182, 137, 115, 1) 100%
    );
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    border-radius: 10px;
`;

const StyledTitle = styled.b`
    color: #000000d4;
    font-size: 30px;
    margin-bottom: 20px;
`;

const Title = React.memo(({ children }) => {
    return <StyledTitle>{children}</StyledTitle>;
});

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledInput = styled.input`
    width: 90%;
    padding: 5px 10px;
    margin: 3px;
    border: 0px solid;
    border-radius: 3px;
    outline: 0px;

    &::placeholder {
        color: #00000024;
    }
`;

const Input = React.memo(({ children }) => {
    return <StyledInput>{children}</StyledInput>;
});

const StyledErrorMessageContainer = styled.div`
    margin-top: 20px;
`;

const ErrorMessageContainer = React.memo(({ children }) => {
    return (
        <StyledErrorMessageContainer>{children}</StyledErrorMessageContainer>
    );
});

const StyledErrorMessage = styled.div`
    color: #d90000;
    font-weight: bold;
    font-size: 15px;
    margin: 5px 0;
    text-align: center;
`;

const ErrorMessage = React.memo(({ children }) => {
    return <StyledErrorMessage>{children}</StyledErrorMessage>;
});

const StyledLoginButton = styled.button`
    color: #000000e3;
    cursor: pointer;
    margin-top: 50px;
    width: 90%;
    height: 50px;
    padding: 5px 10px;
    background-color: #faf3e0;
    border: 0px solid;
    border-radius: 5px;

    &:active {
        background-color: #e0c4b6;
    }
`;

const LoginButton = React.memo(({ children }) => {
    return <StyledLoginButton to={'/signup'}>{children}</StyledLoginButton>;
});

const StyledSignUp = styled(Link)`
    color: #faf3e0;
    cursor: pointer;
    margin-top: 5px;
    font-size: 17px;
    transition: 0.2s linear;
`;

const SignUp = React.memo(({ children }) => {
    return <StyledSignUp to={'/signup'}>{children}</StyledSignUp>;
});

const LoginPresenter = ({
    loginData,
    error,
    onSubmit,
    onDataChange,
    idRef,
    loading,
}) => {
    return (
        <Container>
            <Title>TODO LIST</Title>
            <Form onSubmit={onSubmit}>
                <Input
                    ref={idRef}
                    name="username"
                    type="text"
                    placeholder={'id'}
                    value={loginData.username}
                    onChange={onDataChange}
                    required
                />
                <Input
                    name="password"
                    type="password"
                    placeholder={'password'}
                    value={loginData.password}
                    onChange={onDataChange}
                    required
                />
                {!loading ? <LoginButton>LOGIN</LoginButton> : <Loader />}
            </Form>
            <span style={{ color: '#faf3e0', fontWeight: '100' }}>or</span>
            <SignUp>SIGN UP</SignUp>
            <ErrorMessageContainer>
                {error.length > 0 &&
                    error.map(e => {
                        return e.map(_e => {
                            return <ErrorMessage>{_e}</ErrorMessage>;
                        });
                    })}
            </ErrorMessageContainer>
        </Container>
    );
};

export default LoginPresenter;
