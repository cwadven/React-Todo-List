import React, {createContext, useContext, useEffect, useReducer} from "react";
import reducer, {SET_COMPLETED, SET_TODO, initialState} from "./reducer";
import ToDoModel from "./models/ToDoModel";

const ToDosContext = createContext();

const ToDosProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getToDoList = async () => {
        const {data: {todo_set}} = await ToDoModel.getToDoList();
        console.log(todo_set)
        return todo_set;
    }

    const getCompletedList = async () => {
        const {data: {completed_set}} = await ToDoModel.getCompletedList();
        return completed_set;
    }

    // eslint-disable-next-line
    useEffect(async ()=>{
        const todoSet = await getToDoList();
        const completedSet = await getCompletedList();
        dispatch({type: SET_TODO, payload: todoSet});
        dispatch({type: SET_COMPLETED, payload: completedSet});
    }, []);

    return <ToDosContext.Provider value={{state, dispatch}}>{children}</ToDosContext.Provider>;
}

// reducer 로 받은 state 바꾸는 것 return 해서 사용하기
export const useDispatch = () => {
    const {dispatch} = useContext(ToDosContext);
    return dispatch;
}

// reducer 로 받은 state 중 toDos 만 사용하기
export const useToDos = () => {
    const {state: {toDos}} = useContext(ToDosContext);
    return toDos;
}

// reducer 로 받은 state 중 completed 만 사용하기
export const useCompleted = () => {
    const {state: {completed}} = useContext(ToDosContext);
    return completed;
}

export default ToDosProvider;