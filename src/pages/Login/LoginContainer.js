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
    const [loading, setLoading] = useState(false);
    const idRef = useRef();

    const onLogin = async () => {
        const {
            data: { token },
        } = await AccountModel.login(loginData);
        await setToken(token);
    };

    const goToDoPage = url => {
        props.history.push(url);
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
            setLoading(true);
            await onLogin();
            goToDoPage('/todo');
        } catch (e) {
            setError(Object.values(e.response.data));
            setLoading(false);
        }
    };

    useEffect(() => {
        idRef.current.focus();
        if (getToken()) {
            goToDoPage('/todo');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <LoginPresenter
            onSubmit={onSubmit}
            goToSignUp={() => {
                goToDoPage('/signup');
            }}
            onDataChange={onDataChange}
            loginData={loginData}
            error={error}
            loading={loading}
            idRef={idRef}
        />
    );
};

export default withRouter(LoginContainer);
