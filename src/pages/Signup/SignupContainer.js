import React, { useCallback, useEffect, useRef, useState } from 'react';
import AccountModel, { getToken, setToken } from '../../models/AccountModel';
import { withRouter } from 'react-router-dom';
import SignupPresenter from './SignupPresenter';
import ReactRouterPropTypes from 'react-router-prop-types';

const SignupContainer = ({ history }) => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    });
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const idRef = useRef();

    const onSignup = async () => {
        const {
            data: { token },
        } = await AccountModel.signUp(signUpData);
        await setToken(token);
    };

    const goToDoPage = () => {
        history.push('/todo');
    };

    const onDataChange = useCallback(e => {
        setSignUpData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }, []);

    const onSubmit = useCallback(
        async e => {
            e.preventDefault();
            try {
                setLoading(true);
                await onSignup();
                goToDoPage();
            } catch (e) {
                setLoading(false);
                if (e.response) {
                    setError(Object.values(e.response.data));
                } else {
                    setError('something went wrong...');
                }
            }
        },
        // eslint-disable-next-line
        [signUpData],
    );

    useEffect(() => {
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

SignupContainer.propTypes = {
    history: ReactRouterPropTypes.history,
};

export default withRouter(SignupContainer);
