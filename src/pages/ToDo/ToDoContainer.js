import React from 'react';
import ToDoPresenter from './ToDoPresenter';
import { useCompleted, useToDos } from '../../context';

const ToDoContainer = () => {
    const toDos = useToDos();
    const completed = useCompleted();

    return <ToDoPresenter toDos={toDos} completed={completed} />;
};

export default ToDoContainer;
