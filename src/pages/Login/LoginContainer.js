import React, { useCallback, useEffect, useState } from 'react';
import LoginPresenter from './LoginPresenter';
import AccountModel, { getToken, setToken } from '../../models/AccountModel';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

const LoginContainer = ({ history }) => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        const {
            data: { token },
        } = await AccountModel.login(loginData);
        await setToken(token);
    };

    const goToDoPage = url => {
        history.push(url);
    };

    const onDataChange = useCallback(e => {
        setLoginData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }, []);

    const onSubmit = useCallback(
        async e => {
            e.preventDefault();
            try {
                setLoading(true);
                await onLogin();
                goToDoPage('/todo');
            } catch (e) {
                setLoading(false);
                if (e.response) {
                    setError(e.response.data.message);
                } else {
                    setError('something went wrong...');
                }
            }
        },
        // eslint-disable-next-line
        [loginData],
    );

    useEffect(() => {
        if (getToken()) {
            goToDoPage('/todo');
        }
        // eslint-disable-next-line
    }, []);

    return (
        <LoginPresenter
            onSubmit={onSubmit}
            onDataChange={onDataChange}
            loginData={loginData}
            error={error}
            loading={loading}
        />
    );
};

LoginContainer.propTypes = {
    history: ReactRouterPropTypes.history,
};

export default withRouter(LoginContainer);
