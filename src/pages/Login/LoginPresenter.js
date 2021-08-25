import React from 'react';
import styled from '@emotion/styled';
import Loader from '../../Components/Loader';

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

    border: 1px solid #1e212d;
    border-radius: 10px;
`;

const Title = styled.b`
    font-size: 30px;
    margin-bottom: 10px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: 90%;
    padding: 5px 10px;
    margin: 3px;
    border: 0px solid;
    border-radius: 3px;
    outline: 0px;
`;

const Message = styled.div`
    font-size: 15px;
    margin: 10px 0;
`;

const LoginButton = styled.button`
    margin-top: 5px;
    width: 100px;
    padding: 5px 10px;
    background-color: #faf3e0;
    border: 1px solid;
    border-radius: 5px;
    transition: 0.3s linear;

    &:hover {
        width: 120px;
        padding: 5px 12px;
    }

    &:active {
        background-color: #e0c4b6;
    }
`;

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
            <Title>ToDo List</Title>
            <Form onSubmit={onSubmit}>
                <Input
                    ref={idRef}
                    name="username"
                    type="text"
                    placeholder={'id'}
                    value={loginData.username}
                    onChange={onDataChange}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder={'password'}
                    value={loginData.password}
                    onChange={onDataChange}
                />
                {!loading ? <LoginButton>LOGIN</LoginButton> : <Loader />}
            </Form>
            <Message>{error}</Message>
        </Container>
    );
};

export default LoginPresenter;
