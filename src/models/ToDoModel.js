import axios from 'axios';
import { getToken } from '../models/AccountModel';

const api = axios.create({
    baseURL: 'https://record-to-do-list.shop/',
    // baseURL: 'http://127.0.0.1:8000/',
});

const ToDoModel = {
    getToDoList: (categoryId='') => {
        let url;

        if (categoryId === null) {
            url = `todo?categoryId=null`;
        } else if (categoryId === '') {
            url = `todo`;
        } else {
            url = `todo?categoryId=${categoryId}`;
        }

        return api.get(url, {
            headers: { Authorization: getToken() },
        });
    },
    getCategorySet: () => {
        return api.get('todo/category', {
            headers: { Authorization: getToken() },
        });
    },
    addCategory: data => {
        return api.post('todo/category', data, {
            headers: { Authorization: getToken() },
        });
    },
    editCategory: data => {
        const { categoryId, name, orderNumber } = data;
        return api.put(`todo/category/${categoryId}`, { name, orderNumber }, {
            headers: { Authorization: getToken() },
        });
    },
    deleteCategory: categoryId => {
        return api.delete(`todo/category/${categoryId}`, {
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
    putToDoOrder: data => {
        return api.put(`todo/change-order-number`, data, {
            headers: { Authorization: getToken() },
        });
    },
    getCompletedList: () => {
        return api.get('todo/completed', {
            headers: { Authorization: getToken() },
        });
    },
    getCompletedTodayList: (categoryId='') => {
        let url;

        if (categoryId === null) {
            url = `todo/completed/today?categoryId=null`;
        } else if (categoryId === '') {
            url = `todo/completed/today`;
        } else {
            url = `todo/completed/today?categoryId=${categoryId}`;
        }

        return api.get(url, {
            headers: { Authorization: getToken() },
        });
    },
    changeCompletedStatus: data =>
        api.put(`todo/completed/${data.id}`, data, {
            headers: { Authorization: getToken() },
        }),
};

export default ToDoModel;
