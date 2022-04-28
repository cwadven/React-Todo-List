import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ModalActiveButton = styled.div`
    font-size: 13px;
    cursor: pointer;

    margin: 5px 3px;
    display: flex;
    background: transparent;
    border: transparent;
    transition: 0.1s linear;
    justify-content: center;
    align-items: center;

    &:hover {
        color: #eabf9f;
    }
`;

const CategoryShowModalButton = ({Icon, desc, ModalComponent}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onModalOpenClick = () => {
        setIsModalOpen(prevState => !prevState);
    };

    return (
        <>
            <ModalActiveButton onClick={onModalOpenClick}>
                <Icon size={20} />
                {desc}
            </ModalActiveButton>
            {isModalOpen && (
                <ModalComponent onModalOpenClick={onModalOpenClick} />
            )}
        </>
    );
};

CategoryShowModalButton.propTypes = {
    Icon: PropTypes.any,
    ModalComponent: PropTypes.any,
    desc: PropTypes.string,
};

export default CategoryShowModalButton;
