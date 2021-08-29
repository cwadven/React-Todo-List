import React from 'react';
import styled from '@emotion/styled';
import pepe from '../assets/pepe.gif';
import PropTypes from 'prop-types';

const Container = styled.div`
    text-align: center;
`;

const Img = styled.img`
    border-radius: 10px;
    margin-top: 10px;
`;

const Bold = styled.b``;

const LeftCounter = ({ toDosCount, completedCount }) => {
    return (
        <Container>
            <Bold>LEFT TO DOS : {toDosCount}</Bold>
            <div>
                🏃‍♂️
                <progress
                    id="file"
                    max="100"
                    value={Number(
                        (completedCount / (toDosCount + completedCount)) * 100,
                    ).toFixed(2)}
                />
                🏃‍♀️
            </div>
            <Img src={pepe} />
        </Container>
    );
};

LeftCounter.propTypes = {
    toDosCount: PropTypes.number,
    completedCount: PropTypes.number,
};

export default React.memo(LeftCounter);
