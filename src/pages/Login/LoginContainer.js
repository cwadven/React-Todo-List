import React, { useEffect, useRef, useState } from 'react';
import LoginPresenter from './LoginPresenter';
import AccountModel, { getToken, setToken } from '../../models/AccountModel';
import { withRouter } from 'react-router-dom';

const LoginContainer = props => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('🎈 Hello & 😀 Happy');
    const idRef = useRef();

    const onLogin = async () => {
        const {
            data: { token },
        } = await AccountModel.login(loginData);
        await setToken(token);
    };

    const goToDoPage = () => {
        props.history.replace('/todo');
    };

    const onDataChange = e => {
        setLoginData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await onLogin();
            goToDoPage();
        } catch (e) {
            setError(Object.values(e.response.data));
        }
    };

    useEffect(() => {
        idRef.current.focus();
        if (getToken()) {
            goToDoPage();
        }
    }, []);

    return (
        <LoginPresenter
            onSubmit={onSubmit}
            onDataChange={onDataChange}
            loginData={loginData}
            error={error}
            idRef={idRef}
        />
    );
};

export default withRouter(LoginContainer);
