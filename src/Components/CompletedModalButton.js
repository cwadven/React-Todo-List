import React, { useState } from 'react';
import styled from '@emotion/styled';
import { AiOutlineSchedule } from 'react-icons/all';
import CompletedModal from './CompletedModal';

const ModalActiveButton = styled.button`
    position: absolute;
    right: 10px;
    width: 60px;
    height: 100%;

    margin: 0 3px;
    display: inline-flex;
    background: transparent;
    border: transparent;
    transition: 0.1s linear;
    justify-content: center;
    align-items: center;

    &:hover {
        color: #eabf9f;
    }
`;

const CompletedModalButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onModalOpenClick = () => {
        setIsModalOpen(prevState => !prevState);
    };

    return (
        <>
            <ModalActiveButton onClick={onModalOpenClick}>
                <AiOutlineSchedule size={30} />
            </ModalActiveButton>
            {isModalOpen && (
                <CompletedModal onModalOpenClick={onModalOpenClick} />
            )}
        </>
    );
};

export default CompletedModalButton;
