import React, { useEffect, useRef, useState } from 'react';
import AccountModel, { getToken, setToken } from '../../models/AccountModel';
import { withRouter } from 'react-router-dom';
import SignupPresenter from './SignupPresenter';

const SignupContainer = props => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    });
    const [error, setError] = useState('🎈 Hello & 😀 Happy');
    const [loading, setLoading] = useState(false);
    const idRef = useRef();

    const onLogin = async () => {
        const {
            data: { token },
        } = await AccountModel.login(signUpData);
        await setToken(token);
    };

    const goToDoPage = () => {
        props.history.replace('/todo');
    };

    const onDataChange = e => {
        setSignUpData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async e => {
        e.preventDefault();
        try {
            setLoading(true);
            await onLogin();
            goToDoPage();
        } catch (e) {
            setError(Object.values(e.response.data));
            setLoading(false);
        }
    };

    useEffect(() => {
        idRef.current.focus();
        if (getToken()) {
            goToDoPage();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <SignupPresenter
            onSubmit={onSubmit}
            onDataChange={onDataChange}
            signUpData={signUpData}
            error={error}
            loading={loading}
            idRef={idRef}
        />
    );
};

export default withRouter(SignupContainer);
