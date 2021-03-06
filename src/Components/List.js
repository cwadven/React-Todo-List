import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import ToDo from './ToDo';
import CompletedModalButton from './CompletedModalButton';
import PropTypes from 'prop-types';

const Container = styled.section`
    width: 100%;
`;

const SubTitle = styled.div`
    position: relative;
    text-align: center;
    font-size: 27px;
    font-weight: bold;
    color: #1e212d;
`;

const List = ({ name, itemSet, isCompleted, categorySet }) => {
    const [now, setNow] = useState(new Date());
    const interval = useRef();

    useEffect(() => {
        if (itemSet.length > 0 && name === 'To Dos') {
            if (
                itemSet.some(item => {
                    return new Date(item.deadLine) > new Date();
                })
            ) {
                interval.current = setInterval(() => setNow(new Date()), 1000);
            }
        }

        return () => {
            clearInterval(interval.current);
        };
    }, [itemSet, name, now]);

    useEffect(() => {
        if (itemSet.length > 0 && name === 'To Dos') {
            if (
                itemSet.every(item => {
                    return new Date(item.deadLine) < new Date();
                })
            ) {
                clearInterval(interval.current);
            }
        }
    }, [itemSet, name, now]);

    return (
        <Container>
            <SubTitle>
                {name}
                {name === 'Completed' && <CompletedModalButton />}
            </SubTitle>

            <div>
                {itemSet.map((toDo, idx) => (
                    <ToDo
                        categoryId={toDo['category__id']}
                        categoryName={toDo['category__name']}
                        categorySet={categorySet}
                        total_length={itemSet.length}
                        idx={idx + 1}
                        key={toDo.id}
                        id={toDo.id}
                        nextId={idx === itemSet.length - 1 ? null : itemSet[idx+1].id}
                        prevId={idx === 0 ? null : itemSet[idx-1].id}
                        text={toDo.text}
                        deadLine={
                            toDo.deadLine ? new Date(toDo.deadLine) : null
                        }
                        startDate={
                            toDo.startDate ? new Date(toDo.startDate) : null
                        }
                        completedDate={
                            toDo.completedDate
                                ? new Date(toDo.completedDate)
                                : null
                        }
                        isCompleted={isCompleted}
                    />
                ))}
            </div>
        </Container>
    );
};

List.propTypes = {
    name: PropTypes.string,
    itemSet: PropTypes.array,
    isCompleted: PropTypes.bool,
    categorySet: PropTypes.array,
};

export default List;
