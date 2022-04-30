import React from 'react';

import styled from '@emotion/styled';

import Add from '../../Components/Add';
import List from '../../Components/List';
import LeftCounter from '../../Components/LeftCounter';
import Congratulate from '../../Components/Congratulate';
import PropTypes from 'prop-types';
import Loader from '../../Components/Loader';
import CategoryShowModalButton from '../../Components/CategoryShowModalButton';
import CategoryCreateModal from '../../Components/CategoryCreateModal';
import CategoryEditModal from '../../Components/CategoryEditModal';
import CategoryDeleteModal from '../../Components/CategoryDeleteModal';
import { FiEdit, MdNoteAdd } from 'react-icons/all';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from '../../context';
import ToDoModel from '../../models/ToDoModel';
import { errorResponse } from '../../models/AccountModel';
import { SET_COMPLETED, SET_TODO } from '../../reducer';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 80vw;
    max-width: 400px;
    height: 100vw;
    max-height: 500px;
    background: linear-gradient(
        169deg,
        rgba(224, 196, 182, 1) 0%,
        rgba(182, 137, 115, 1) 100%
    );
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    border-radius: 10px;
`;

const StyledTitle = styled.header`
    color: #b68973;
    font-size: 40px;
    font-style: italic;
    font-family: fantasy;
    font-weight: 900;
    text-align: center;
    margin: 10px 0;
`;

const Title = React.memo(({ children }) => {
    return <StyledTitle>{children}</StyledTitle>;
});

Title.propTypes = {
    children: PropTypes.node,
};

const Grid = styled.div`
    display: grid;
    margin: 30px 30px;
    justify-items: center;
    grid-gap: 10px;

    @media (min-width: 630px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 630px) {
        grid-template-columns: 1fr;
    }
`;

const CategoryContainer = styled.div`
    margin: 10px 15px 0px 15px;
    display: flex;
    overflow-x: scroll;
    alignItems: center;

    &::-webkit-scrollbar {
        width: 5px;
        height: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #b68973;
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
    }

    &::-webkit-scrollbar-track {
        background-color: #dfdfdf;
        border-radius: 5px;
        box-shadow: inset 0px 0px 5px white;
    }
`;

const CategoryItem = styled.div`
    padding: 5px 10px;
    white-space: nowrap;
    transition: 0.1s linear;
    cursor: pointer;
    
    &:hover {
        color: #eabf9f;
    }
`;

const ToDoPresenter = ({ toDos, completed, categorySet, isPending }) => {

    const dispatch = useDispatch();

    const getCategoryFilteredToDoList = async (categoryId) => {
        try {
            const {
                data: { todo_set },
            } = await ToDoModel.getToDoList(categoryId);
            return todo_set;
        } catch (e) {
            console.log(e);
            errorResponse(e.response);
        }
    };

    const getCategoryFilteredCompletedTodayList = async (categoryId) => {
        try {
            const {
                data: { completed_set },
            } = await ToDoModel.getCompletedTodayList(categoryId);
            return completed_set;
        } catch (e) {
            console.log(e);
            errorResponse(e.response);
        }
    };

    const onCategoryFilteredClick = async (categoryId) => {
        const todoSet = await getCategoryFilteredToDoList(categoryId);
        const completedSet = await getCategoryFilteredCompletedTodayList(categoryId);
        dispatch({ type: SET_TODO, payload: todoSet });
        dispatch({ type: SET_COMPLETED, payload: completedSet });
    };

    return isPending ? (
        <Container>
            <Title>Loading</Title>
            <Title>Your</Title>
            <Title>To Dos</Title>
            <Loader size={'40'} outerSize={'7'} color={'#eabf9f'} />
        </Container>
    ) : (
        <>
            <Title>My To Do List</Title>
            {toDos && completed && toDos.length > 0 ? (
                <LeftCounter
                    toDosCount={toDos.length}
                    completedCount={completed.length}
                />
            ) : (
                ''
            )}
            {toDos && completed && toDos.length === 0 && completed.length > 0 ? <Congratulate /> : ''}
            <div style={{ textAlign: 'center' }}>
                <CategoryShowModalButton Icon={MdNoteAdd} desc={'Click to Add Category'}
                                         CategoryModalComponent={CategoryCreateModal} />
                <CategoryShowModalButton Icon={FiEdit} desc={'Click to Edit Category'}
                                         CategoryModalComponent={CategoryEditModal} categorySet={categorySet} />
                <CategoryShowModalButton Icon={AiFillDelete} desc={'Click to Delete Category'}
                                         CategoryModalComponent={CategoryDeleteModal} categorySet={categorySet} />
            </div>
            <Add categorySet={categorySet} />
            <CategoryContainer>
                {[{ id: '', name: '전체' }, { id: null, name: '설정안함' }, ...categorySet].map((category) => {
                    return (
                        <CategoryItem
                            key={category.id}
                            onClick={async () => {
                                await onCategoryFilteredClick(category.id);
                            }}
                        >
                            {category.name}
                        </CategoryItem>
                    );
                })}
            </CategoryContainer>
            {toDos && completed &&
            <Grid>
                <List categorySet={categorySet} name='To Dos' itemSet={toDos} isCompleted={false} />
                <List categorySet={categorySet} name='Completed' itemSet={completed} isCompleted={true} />
            </Grid>
            }
        </>
    );
};

ToDoPresenter.propTypes = {
    toDos: PropTypes.array,
    completed: PropTypes.array,
    categorySet: PropTypes.array,
    isPending: PropTypes.bool,
};

export default ToDoPresenter;
