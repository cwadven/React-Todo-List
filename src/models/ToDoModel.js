import axios from 'axios';
import {getAccesesToken} from "../models/AccountModel";

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
    // completed 가 "" 인 것들 다 가져오기
    getToDoList: () => {
        return api.get('todo', {
            headers: {Authorization: getAccesesToken()},
        });
    },
    // 당일 기준
    getCompletedList: () => api.get('todo/completed', {
        headers: {Authorization: getAccesesToken()},
    }),
}

export default ToDoModel;