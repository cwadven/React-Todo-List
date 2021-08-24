import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import styled from '@emotion/styled';

import Footer from './Components/Footer';
import ToDo from './pages/ToDo';
import Login from './pages/Login';
import ToDosProvider from './context';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

function App() {
    return (
        <Container>
            <BrowserRouter>
                <Switch>
                    <Route path={'/'} exact component={Login} />
                    <Route path={'/login'} component={Login} />
                    <ToDosProvider>
                        <Route path={'/todo'} component={ToDo} />
                    </ToDosProvider>
                    <Redirect from={'*'} to={'/'} />
                </Switch>
            </BrowserRouter>
            <Footer />
        </Container>
    );
}

export default App;
