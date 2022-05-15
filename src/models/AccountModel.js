import axios from 'axios';

const api = axios.create({
    baseURL: 'https://record-to-do-list.shop/',
    // baseURL: 'http://127.0.0.1:8000/',
});

export const getToken = () => window.sessionStorage.getItem('__AUTH__');
export const setToken = token =>
    window.sessionStorage.setItem('__AUTH__', `jwt ${token}`);

export const errorResponse = errResponse => {
    // 로그인 에러
    const errorData = errResponse.data;

    if (errorData) {
        if (Object.values(errorData).some(msg => msg === 'No Auth')) {
            alert('No Auth Login Please');
            window.sessionStorage.clear();
            window.location.replace('/');
        }
        // 토큰 에러
        if (
            Object.values(errorData).some(
                msg => msg === 'Error decoding signature.',
            )
        ) {
            alert('No Auth Login Please');
            window.sessionStorage.clear();
            window.location.replace('/');
        }
        if (
            Object.values(errorData).some(
                msg => msg === 'Authentication credentials were not provided.',
            )
        ) {
            alert('No Auth Login Please');
            window.sessionStorage.clear();
            window.location.replace('/');
        }
    } else {
        alert('Something went wrong...');
        window.sessionStorage.clear();
        window.location.replace('/');
    }
};

const AccountModel = {
    login: data => api.post('accounts/login', data),
    signUp: data => api.post('accounts/registration', data),
};

export default AccountModel;
