import axios from 'axios';
import { getToken } from '../models/AccountModel';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

// 생성하기 -> ADD 하는 순간, post 해서 추가하기
// 수정하기 -> EDIT 하는 순간, 해당 id 찾아서 DB 에서 수정
// 삭제하기 -> DELETE 하는 순간, 해당 id 찾아서 DB 에서 삭제

// to_do -> Completed : 해당 id 만 update
// Completed -> to_do : 해당 id 만 update

// 이런 이벤트가 하나라도 발생하면 전부 getToDo, getCompleted 다시??
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
    putCompletedDetail: data =>
        api.get(`todo/completed/${data.id}`, {
            headers: { Authorization: getToken() },
            data,
        }),
    deleteCompletedDetail: id =>
        api.delete(`todo/completed/${id}`, {
            headers: { Authorization: getToken() },
        }),
};

export default ToDoModel;
