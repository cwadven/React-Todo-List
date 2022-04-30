export const SET_TODO = 'getTodo';
export const SET_COMPLETED = 'getCompleted';
export const SET_TODO_AND_COMPLETED = 'setTodoAndCompleted';
export const SET_CATEGORY = 'getCategory';
export const SET_TODO_WITH_NEW_CATEGORY_NAME = 'setTodoWithNewCategoryName';
export const SET_TODO_WITH_DELETED_CATEGORY_NAME = 'setTodoWithDeletedCategoryName';
export const ADD_CATEGORY = 'addCategory';
export const ADD = 'add';
export const DELETE = 'delete';
export const COMPLETE = 'complete';
export const UNCOMPLETE = 'uncomplete';
export const EDIT = 'edit';
export const ORDERCHANGE = 'orderchange';

export const initialState = {
    toDos: [],
    completed: [],
    categorySet: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_TODO:
            return { ...state, toDos: action.payload };
        case SET_COMPLETED:
            return { ...state, completed: action.payload };
        case SET_CATEGORY:
            return { ...state, categorySet: action.payload };
        case SET_TODO_WITH_NEW_CATEGORY_NAME:
            return {
                ...state,
                completed: state.completed.map(_completed => {
                    if (_completed.category__id === action.payload.categoryId) {
                        return { ..._completed, category__name: action.payload.categoryName };
                    } else {
                        return _completed;
                    }
                }),
                toDos: state.toDos.map(toDo => {
                    if (toDo.category__id === action.payload.categoryId) {
                        return { ...toDo, category__name: action.payload.categoryName };
                    } else {
                        return toDo;
                    }
                }),
            };
        case SET_TODO_WITH_DELETED_CATEGORY_NAME:
            return {
                ...state,
                completed: state.completed.map(_completed => {
                    if (_completed.category__id === action.payload.categoryId) {
                        return { ..._completed, category__name: null };
                    } else {
                        return _completed;
                    }
                }),
                toDos: state.toDos.map(toDo => {
                    if (toDo.category__id === action.payload.categoryId) {
                        return { ...toDo, category__name: null };
                    } else {
                        return toDo;
                    }
                }),
            };
        case ADD_CATEGORY:
            return {
                ...state,
                categorySet: [
                    ...state.categorySet,
                    {
                        id: action.payload.id,
                        name: action.payload.name,
                        orderNumber: action.payload.orderNumber,
                    },
                ],
            };
        case ADD:
            return {
                ...state,
                toDos: [
                    ...state.toDos,
                    {
                        id: action.payload.id,
                        text: action.payload.toDoText,
                        deadLine: action.payload.toDoDeadLine,
                        category__id: action.payload.toDoCategory,
                        category__name: action.payload.categoryName,
                        startDate: action.payload.startDate,
                        completedDate: action.payload.completedDate,
                    },
                ],
            };
        case DELETE:
            return {
                ...state,
                toDos: state.toDos.filter(toDo => toDo.id !== action.payload),
                completed: state.completed.filter(
                    toDo => toDo.id !== action.payload,
                ),
            };
        case COMPLETE:
            return {
                ...state,
                completed: [
                    ...state.completed,
                    {
                        ...state.toDos.find(toDo => toDo.id === action.payload),
                        completedDate: new Date(),
                    },
                ],
                toDos: state.toDos.filter(toDo => toDo.id !== action.payload),
            };
        case UNCOMPLETE:
            return {
                ...state,
                toDos: [
                    ...state.toDos,
                    {
                        ...state.completed.find(
                            toDo => toDo.id === action.payload,
                        ),
                        completedDate: '',
                    },
                ],
                completed: state.completed.filter(
                    toDo => toDo.id !== action.payload,
                ),
            };
        case EDIT:
            // 위치 찾기
            // eslint-disable-next-line no-case-declarations
            const targetIndex = state.toDos.findIndex(
                toDo => toDo.id === action.payload.id,
            );
            state.toDos[targetIndex] = {
                ...state.toDos[targetIndex],
                text: action.payload.edit,
                deadLine: action.payload.editDeadLine,
                category__id: action.payload.editCategory,
                category__name: action.payload.editCategoryName,
            };
            return {
                ...state,
                toDos: [...state.toDos],
            };
        case ORDERCHANGE:
            // 위치 수정
            // eslint-disable-next-line no-case-declarations
            const orderingTargetIndex = state.toDos.findIndex(
                toDo => toDo.id === action.payload.targetId,
            );
            // eslint-disable-next-line no-case-declarations
            const orderingCurrentIndex = state.toDos.findIndex(
                toDo => toDo.id === action.payload.currentId,
            );
            // eslint-disable-next-line no-case-declarations
            const temp = state.toDos[orderingTargetIndex];
            state.toDos[orderingTargetIndex] = state.toDos[orderingCurrentIndex];
            state.toDos[orderingCurrentIndex] = temp;

            return {
                ...state,
                toDos: [...state.toDos],
            };
        default:
            throw new Error();
    }
};

export default reducer;
