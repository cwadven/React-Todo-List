import React, { useEffect } from 'react';
import ToDoPresenter from './ToDoPresenter';
import { getIsPending, useCategory, useCompleted, useToDos } from '../../context';
import { getToken } from '../../models/AccountModel';

const ToDoContainer = () => {
    const toDos = useToDos();
    const completed = useCompleted();
    const categorySet = useCategory();
    const isPending = getIsPending();

    useEffect(() => {
        const loginToken = getToken();
        if (!loginToken) {
            window.location.replace('/');
        }
    }, [])

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
