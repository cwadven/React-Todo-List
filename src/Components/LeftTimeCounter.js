import React from 'react';
import styled from "@emotion/styled";

const Container = styled.div`
    text-align: center;
    margin: 10px 0;
`;

const ProgressBack = styled.div`
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background-color: white;
`;

// 각각의 keyframes 만들기 안 그러면 keyframes 공유로 문제 생김
const Progress = styled.div`
    width: ${props => props.value}%;
    height: 10px;
    border-radius: 5px;
    background-color: green;
    animation-name: big${props => props.id};
    animation-duration: ${props => props.leftTime}s;
    
    @keyframes big${props => props.id} {
        from {
          width: ${props => props.value}%;
        }
        to {
          width: 100%;
        }
    }
`;

const Percentage = styled.b`
    font-size: 15px;
    text-align: center;
`;

const LeftTimeCounter = ({deadLine, startDate, id}) => {
    const totalTime = (deadLine.getTime() / 1000) - (startDate.getTime() / 1000);
    const leftTime = (deadLine.getTime() / 1000) - (new Date().getTime() / 1000);

    // 몇분 남음
    // 몇초 남음 분기로 나누기
    // 차츰 차츰 시간가는 거 보여주기 animate 로

    const percentage = Number(((totalTime - leftTime) / totalTime) * 100);
    console.log(percentage, leftTime, id);
    return (
        <Container>
            <ProgressBack>
                <Progress value={percentage >= 100 ? "100" : percentage} leftTime={leftTime} id={id}/>
            </ProgressBack>
            <Percentage>{percentage >= 100 ? "100" : percentage.toFixed(0)} %</Percentage>
        </Container>
    )
}

export default LeftTimeCounter;