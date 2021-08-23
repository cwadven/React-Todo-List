import React, {useEffect, useRef, useState} from 'react';
import styled from "@emotion/styled";
import ToDo from "../Components/ToDo";

const Container = styled.section`
    width: 48%;
`;

const SubTitle = styled.div`
    font-size: 27px;
    font-weight: bold;
    color: #1E212D;
`

const List = ({name, itemSet, isCompleted}) => {
    const [now, setNow] = useState(new Date());
    const interval = useRef();

    useEffect(() => {
        if (name === "To Dos") {
            if (itemSet.length > 0 && itemSet.some((item) => {
                return item.deadLine > new Date()
            })) {
                interval.current = setInterval(() => setNow(new Date()), 1000);
            }
        }

        return () => {
            clearInterval(interval.current);
        };
    }, [itemSet]);

    useEffect(() => {
        if (name === "To Dos") {
            if (itemSet.length > 0 && itemSet.every((item) => {
                return item.deadLine < new Date();
            })) {
                clearInterval(interval.current);
            }
        }
    }, [now])

    return (
        <Container>
            <SubTitle>{name}</SubTitle>
            <div>
                {itemSet.map((toDo) => (
                    <ToDo key={toDo.id} id={toDo.id} text={toDo.text} deadLine={toDo.deadLine}
                          startDate={toDo.startDate} completedDate={toDo.completedDate} isCompleted={isCompleted}/>
                ))}
            </div>
        </Container>
    )
}

export default List;