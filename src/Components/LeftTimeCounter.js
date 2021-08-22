import React, {useEffect, useRef, useState} from 'react';
import styled from "@emotion/styled";

const Container = styled.div`
    position: relative;
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
    background-color: ${props => props.value <= 45 ? "green" : props.value <= 50 ? "yellow" : props.value <= 85 ? "orange" : "red"};
`;

const Percentage = styled.b`
    font-size: 15px;
    text-align: center;
`;

const Time = styled.div`
    position: absolute;
    font-size: 13px;
    text-align: center;
    right: 0;
`;

const LeftTimeCounter = ({deadLine, startDate}) => {
    const [now, setNow] = useState(new Date());
    const interval = useRef();

    const totalTime = (deadLine.getTime() / 1000) - (startDate.getTime() / 1000);
    const leftTime = (deadLine.getTime() / 1000) - (now.getTime() / 1000);

    const percentage = Number(((totalTime - leftTime) / totalTime) * 100);

    // 몇분 남음
    const secondDisplay = (second) => {
        let display;
        if (second > 3600) {
            display = `${Math.floor((second / 3600))}h ${((second % 3600) / 60).toFixed()}m Left`;
        } else if (second > 60) {
            display = `${Math.floor((second / 60))}m ${(second % 60).toFixed()}s Left`;
        } else if (second > 0) {
            display = `${second.toFixed()}s Left`;
        } else {
            display = `DeadLine`;
        }
        return display;
    }

    useEffect(() => {
        interval.current = setInterval(() => setNow(new Date()), 1000);

        return () => {
            clearInterval(interval.current);
        };
    }, []);

    useEffect(() => {
        if (leftTime <= 0) {
            clearInterval(interval.current);
        }
    }, [leftTime])

    return (
        <Container>
            <ProgressBack>
                <Progress value={percentage >= 100 ? "100" : percentage} leftTime={leftTime}/>
            </ProgressBack>
            <Time>{secondDisplay(leftTime)}</Time>
            <Percentage>{percentage >= 100 ? "100" : percentage.toFixed(1)} %</Percentage>
        </Container>
    )
}

export default LeftTimeCounter;