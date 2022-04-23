import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import reducer, { SET_COMPLETED, SET_TODO, initialState, SET_CATEGORY } from './reducer';
import ToDoModel from './models/ToDoModel';
import { withRouter } from 'react-router-dom';
import { errorResponse } from './models/AccountModel';
import PropTypes from 'prop-types';

const ToDosContext = createContext();

const ToDosProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isPending, setIsPending] = useState(false);

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

    const getCategorySet = async () => {
        try {
            const {
                data: { category_set },
            } = await ToDoModel.getCategorySet();
            return category_set
        } catch (e) {
            console.log(e);
            errorResponse(e.response);
        }
    };

    // eslint-disable-next-line
    useEffect(async () => {
        setIsPending(prevState => !prevState);
        const todoSet = await getToDoList();
        const completedSet = await getCompletedTodayList();
        const categorySet = await getCategorySet();
        dispatch({ type: SET_TODO, payload: todoSet });
        dispatch({ type: SET_COMPLETED, payload: completedSet });
        dispatch({ type: SET_CATEGORY, payload: categorySet });
        setIsPending(prevState => !prevState);
    }, []);

    return (
        <ToDosContext.Provider value={{ state, dispatch, isPending }}>
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

// reducer 로 받은 state 중 category 만 사용하기
export const useCategory = () => {
    const {
        state: { categorySet },
    } = useContext(ToDosContext);
    return categorySet;
};

export const getIsPending = () => {
    const { isPending } = useContext(ToDosContext);
    return isPending;
};

ToDosProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withRouter(ToDosProvider);
