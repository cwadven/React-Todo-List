import React from 'react';
import styled from "@emotion/styled";
import congratulation from "../assets/congratulation.png"

const Container = styled.div`
    text-align: center;
    margin-top: 30px;
`;

const Img = styled.img`
    border-radius: 10px;
`;

const Bold = styled.b`
    
`;

const Congratulate = () => {
    return (
        <Container>
            <div>
                <Bold>Congratulation~!</Bold>
            </div>
            <Img src={congratulation}/>
        </Container>
    );
}

export default Congratulate;