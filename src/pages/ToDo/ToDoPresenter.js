import React from 'react';

import styled from '@emotion/styled';

import Add from '../../Components/Add';
import List from '../../Components/List';
import LeftCounter from '../../Components/LeftCounter';
import Congratulate from '../../Components/Congratulate';
import PropTypes from 'prop-types';
import Loader from '../../Components/Loader';
import CategoryCreateModalButton from '../../Components/CategoryCreateModalButton';

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

const ToDoPresenter = ({ toDos, completed, categorySet, isPending }) => {
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
            {toDos.length > 0 ? (
                <LeftCounter
                    toDosCount={toDos.length}
                    completedCount={completed.length}
                />
            ) : (
                ''
            )}
            {toDos.length === 0 && completed.length > 0 ? <Congratulate /> : ''}
            <Add categorySet={categorySet} />
            <div style={{ textAlign: 'center' }}>
                <CategoryCreateModalButton />
            </div>
            <Grid>
                <List categorySet={categorySet} name='To Dos' itemSet={toDos} isCompleted={false} />
                <List categorySet={categorySet} name='Completed' itemSet={completed} isCompleted={true} />
            </Grid>
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
