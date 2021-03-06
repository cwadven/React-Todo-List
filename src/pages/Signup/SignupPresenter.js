import React from 'react';
import styled from '@emotion/styled';
import Loader from '../../Components/Loader';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

Title.propTypes = {
    children: PropTypes.node,
};

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

const Input = React.memo(
    ({ name, type, placeholder, value, onChange, required, disabled }) => {
        return (
            <StyledInput
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
            />
        );
    },
);

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
};

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

ErrorMessage.propTypes = {
    children: PropTypes.node,
};

const StyledSignUpButton = styled.button`
    cursor: pointer;
    color: #f9f9f9;
    margin-top: 50px;
    width: 90%;
    height: 50px;
    padding: 5px 10px;
    background-color: #1e212d;
    border: 0px solid;
    border-radius: 5px;
`;

const SignUpButton = React.memo(({ children }) => {
    return <StyledSignUpButton to={'/signup'}>{children}</StyledSignUpButton>;
});

SignUpButton.propTypes = {
    children: PropTypes.node,
};

const StyledBack = styled(Link)`
    color: #faf3e0;
    cursor: pointer;
    margin-top: 5px;
    font-size: 17px;
    transition: 0.2s linear;
`;

const Back = React.memo(({ children }) => {
    return <StyledBack to={'/login'}>{children}</StyledBack>;
});

Back.propTypes = {
    children: PropTypes.node,
};

const SignupPresenter = ({
    signUpData,
    error,
    onSubmit,
    onDataChange,
    loading,
}) => {
    return (
        <Container>
            <Title>SIGN UP</Title>
            <Form onSubmit={onSubmit}>
                <Input
                    name="username"
                    type="text"
                    placeholder={'id'}
                    value={signUpData.username}
                    onChange={onDataChange}
                    disabled={loading}
                    required
                />
                <Input
                    name="password1"
                    type="password"
                    placeholder={'password'}
                    value={signUpData.password1}
                    onChange={onDataChange}
                    disabled={loading}
                    required
                />
                <Input
                    name="password2"
                    type="password"
                    placeholder={'password check'}
                    value={signUpData.password2}
                    onChange={onDataChange}
                    disabled={loading}
                    required
                />
                {!loading ? (
                    <SignUpButton>Sign up</SignUpButton>
                ) : (
                    <Loader size={'64'} outerSize={'8'} />
                )}
            </Form>
            {!loading && <Back to={'/'}>Back</Back>}
            {error.map(e => {
                return e.map((_e, index) => {
                    return <ErrorMessage key={index}>{_e}</ErrorMessage>;
                });
            })}
        </Container>
    );
};

SignupPresenter.propTypes = {
    signUpData: PropTypes.object,
    error: PropTypes.array,
    onSubmit: PropTypes.func.isRequired,
    onDataChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default SignupPresenter;
