import axios from 'axios';
import { getToken } from '../models/AccountModel';

const api = axios.create({
    baseURL: 'https://cwadven4.pythonanywhere.com/',
    // baseURL: 'http://127.0.0.1:8000/',
});

const ToDoModel = {
    getToDoList: () => {
        return api.get('todo', {
            headers: { Authorization: getToken() },
        });
    },
    postToDo: data => {
        return api.post('todo', data, {
            headers: {
                Authorization: getToken(),
            },
        });
    },
    putToDoDetail: data => {
        return api.put(`todo/${data.id}`, data, {
            headers: { Authorization: getToken() },
        });
    },
    deleteToDoDetail: id => {
        return api.delete(`todo/${id}`, {
            headers: { Authorization: getToken() },
        });
    },
    getCompletedList: () =>
        api.get('todo/completed', {
            headers: { Authorization: getToken() },
        }),
    changeCompletedStatus: data =>
        api.put(`todo/completed/${data.id}`, data, {
            headers: { Authorization: getToken() },
        }),
};

export default ToDoModel;
