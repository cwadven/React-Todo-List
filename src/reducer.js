import {v4 as uuid} from "uuid";

export const ADD = 'add';
export const DELETE = 'delete';
export const COMPLETE = 'complete';
export const UNCOMPLETE = 'uncomplete';
export const EDIT = 'edit';

export const initialState = {
    toDos: [],
    completed: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                toDos: [
                    ...state.toDos,
                    {
                        id: uuid(),
                        text: action.payload.toDoText,
                        deadLine: action.payload.toDoDeadLine
                    }
                ]
            };
        case DELETE:
            return {
                ...state,
                toDos: state.toDos.filter(toDo => toDo.id !== action.payload),
                completed: state.completed.filter(toDo => toDo.id !== action.payload)
            };
        case COMPLETE:
            return {
                ...state,
                completed: [...state.completed, state.toDos.find(toDo => toDo.id === action.payload)],
                toDos: state.toDos.filter(toDo => toDo.id !== action.payload)
            };
        case UNCOMPLETE:
            return {
                ...state,
                toDos: [...state.toDos, state.completed.find(toDo => toDo.id === action.payload)],
                completed: state.completed.filter(toDo => toDo.id !== action.payload)
            };
        case EDIT:
            // 위치 찾기
            const targetIndex = state.toDos.findIndex(toDo => toDo.id === action.payload.id);
            state.toDos[targetIndex] = {
                ...state.toDos[targetIndex],
                text: action.payload.edit,
                deadLine: action.payload.editDeadLine
            };
            return {
                ...state,
                toDos: [...state.toDos]
            };
        default:
            throw new Error();
    }
}

export default reducer;