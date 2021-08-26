import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import ToDo from '../Components/ToDo';
import { AiOutlineSchedule } from 'react-icons/all';

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

const CompletedModalButton = styled.button`
    position: absolute;
    right: 10px;
    width: 60px;
    height: 100%;

    margin: 0 3px;
    display: inline-flex;
    background: transparent;
    border: transparent;
    transition: 0.1s linear;
    justify-content: center;
    align-items: center;

    &:hover {
        color: #eabf9f;
    }
`;

const List = ({ name, itemSet, isCompleted }) => {
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
                {name === 'Completed' && (
                    <CompletedModalButton>
                        <AiOutlineSchedule size={30} />
                    </CompletedModalButton>
                )}
            </SubTitle>

            <div>
                {itemSet.map(toDo => (
                    <ToDo
                        key={toDo.id}
                        id={toDo.id}
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

export default List;
