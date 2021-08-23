import React from 'react';
import Add from "./Components/Add";
import List from "./Components/List";
import {useCompleted, useToDos} from "./context";
import styled from "@emotion/styled";
import LeftCounter from "./Components/LeftCounter";
import Congratulate from "./Components/Congratulate";
import Footer from "./Components/Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Title = styled.header`
    color: #B68973;
    font-size: 40px;
    font-style: italic;
    font-family: fantasy;
    font-weight: 900;
    text-align: center;
    margin: 10px 0;
`;

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

function App() {
    const toDos = useToDos();
    const completed = useCompleted();

    return (
        <Container>
            <Title>My To Do List</Title>
            <Add/>
            {toDos.length > 0 ? <LeftCounter toDosCount={toDos.length} completedCount={completed.length}/> : ""}
            {toDos.length === 0 && completed.length > 0 ? <Congratulate/> : ""}
            <Grid>
                <List name="To Dos" itemSet={toDos} isCompleted={false} />
                <List name={completed.length > 0 ? "Completed" : ""} itemSet={completed} isCompleted={true} />
            </Grid>
            <Footer />
        </Container>
    );
}

export default App;
