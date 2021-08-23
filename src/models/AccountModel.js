import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

export const getToken = () => window.sessionStorage.getItem('__AUTH__');
export const setToken = (token) => window.sessionStorage.setItem('__AUTH__', token);

export const getAccesesToken = () => {
    if (!getToken()) {
        const {data: {token}} = AccountModel.login();
        setToken(token);
    }
    return `jwt ${getToken()}`;
};

const AccountModel = {
    login: (data) => api.post('accounts/login', {
        username: 'root',
        password: 'root',
    }),
}

export default AccountModel;