import React from 'react';
import Add from "./Components/Add";
import ToDo from "./Components/ToDo";
import List from "./Components/List";
import {useCompleted, useToDos} from "./context";
import styled from "@emotion/styled";

const Title = styled.header`
    color: #B68973;
    font-size: 40px;
    font-style: italic;
    font-family: fantasy;
    font-weight: 900;
    text-align: center;
    margin: 10px 0;
`;

const Container = styled.section`
    display: flex;
    justify-content: space-between;
    margin: 30px 30px;
`;

function App() {
    const toDos = useToDos();
    const completed = useCompleted();

    return (
        <>
            <Title>My To Do List</Title>
            <Add/>
            <Container>
                <List name="To Dos">
                    {toDos.map((toDo) => (
                        <ToDo key={toDo.id} id={toDo.id} text={toDo.text}/>
                    ))}
                </List>

                <List name={completed.length > 0 ? "Completed" : ""}>
                    {completed.map((toDo) => (
                        <ToDo key={toDo.id} id={toDo.id} text={toDo.text} isCompleted/>
                    ))}
                </List>
            </Container>
        </>
    );
}

export default App;
