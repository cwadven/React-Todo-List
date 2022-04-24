import React, { useState } from 'react';
import styled from '@emotion/styled';
import { MdNoteAdd } from 'react-icons/all';
import CategoryCreateModal from '../Components/CategoryCreateModal';

const ModalActiveButton = styled.div`
    font-size: 13px;
    cursor: pointer;

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

const CategoryCreateModalButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onModalOpenClick = () => {
        setIsModalOpen(prevState => !prevState);
    };

    return (
        <>
            <ModalActiveButton onClick={onModalOpenClick}>
                <MdNoteAdd size={20} />
                Click to Add Category
            </ModalActiveButton>
            {isModalOpen && (
                <CategoryCreateModal onModalOpenClick={onModalOpenClick} />
            )}
        </>
    );
};

export default CategoryCreateModalButton;
