import React from 'react';
import Add from "./Components/Add";
import ToDo from "./Components/ToDo";
import List from "./Components/List";
import {useCompleted, useToDos} from "./context";

function App() {
    const toDos = useToDos();
    const completed = useCompleted();

    return (
        <>
            <h1>Add To Do</h1>
            <Add/>
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
        </>
    );
}

export default App;
