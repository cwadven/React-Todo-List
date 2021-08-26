import React, { createContext, useContext, useEffect, useReducer } from 'react';
import reducer, { SET_COMPLETED, SET_TODO, initialState } from './reducer';
import ToDoModel from './models/ToDoModel';
import { withRouter } from 'react-router-dom';
import { errorResponse } from './models/AccountModel';

const ToDosContext = createContext();

const ToDosProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getToDoList = async () => {
        try {
            const {
                data: { todo_set },
            } = await ToDoModel.getToDoList();
            return todo_set;
        } catch (e) {
            console.log(e);
            errorResponse(e.response);
        }
    };

    const getCompletedTodayList = async () => {
        try {
            const {
                data: { completed_set },
            } = await ToDoModel.getCompletedTodayList();
            return completed_set;
        } catch (e) {
            console.log(e);
        }
    };

    // eslint-disable-next-line
    useEffect(async () => {
        const todoSet = await getToDoList();
        const completedSet = await getCompletedTodayList();
        dispatch({ type: SET_TODO, payload: todoSet });
        dispatch({ type: SET_COMPLETED, payload: completedSet });
    }, []);

    return (
        <ToDosContext.Provider value={{ state, dispatch }}>
            {children}
        </ToDosContext.Provider>
    );
};

// reducer 로 받은 state 바꾸는 것 return 해서 사용하기
export const useDispatch = () => {
    const { dispatch } = useContext(ToDosContext);
    return dispatch;
};

// reducer 로 받은 state 중 toDos 만 사용하기
export const useToDos = () => {
    const {
        state: { toDos },
    } = useContext(ToDosContext);
    return toDos;
};

// reducer 로 받은 state 중 completed 만 사용하기
export const useCompleted = () => {
    const {
        state: { completed },
    } = useContext(ToDosContext);
    return completed;
};

export default withRouter(ToDosProvider);
