import React, {createContext, useContext, useReducer} from "react";
import reducer, {initialState} from "./reducer";

const ToDosContext = createContext();

const ToDosProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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