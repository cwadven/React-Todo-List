import React from 'react';
import ToDoPresenter from './ToDoPresenter';
import { getIsPending, useCategory, useCompleted, useToDos } from '../../context';

const ToDoContainer = () => {
    const toDos = useToDos();
    const completed = useCompleted();
    const categorySet = useCategory();
    const isPending = getIsPending();

    return (
        <ToDoPresenter
            toDos={toDos}
            completed={completed}
            categorySet={categorySet}
            isPending={isPending}
        />
    );
};

export default ToDoContainer;
