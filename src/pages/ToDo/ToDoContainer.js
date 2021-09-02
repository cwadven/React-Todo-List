import React from 'react';
import ToDoPresenter from './ToDoPresenter';
import { getIsPending, useCompleted, useToDos } from '../../context';

const ToDoContainer = () => {
    const toDos = useToDos();
    const completed = useCompleted();
    const isPending = getIsPending();

    return (
        <ToDoPresenter
            toDos={toDos}
            completed={completed}
            isPending={isPending}
        />
    );
};

export default ToDoContainer;
