import React from 'react';
import styled from "@emotion/styled";

const Container = styled.section`
    width: 48%;
`;

const SubTitle = styled.div`
    font-size: 27px;
    font-weight: bold;
    color: #1E212D;
`

export default ({name, children}) => (
    <Container>
        <SubTitle>{name}</SubTitle>
        <div>{children}</div>
    </Container>
)