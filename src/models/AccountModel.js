import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cwadven4.pythonanywhere.com/',
});

export const getToken = () => window.sessionStorage.getItem('__AUTH__');
export const setToken = token =>
    window.sessionStorage.setItem('__AUTH__', `jwt ${token}`);
export const errorResponse = errResponseData => {
    // 로그인 에러
    if (Object.values(errResponseData).some(msg => msg === 'No Auth')) {
        alert('No Auth Login Please');
        window.sessionStorage.clear();
        window.location.replace('/');
    }
    // 토큰 에러
    if (
        Object.values(errResponseData).some(
            msg => msg === 'Error decoding signature.',
        )
    ) {
        alert('No Auth Login Please');
        window.sessionStorage.clear();
        window.location.replace('/');
    }
};

const AccountModel = {
    login: data => api.post('accounts/login', data),
    signUp: data => api.post('accounts/registration', data),
};

export default AccountModel;
