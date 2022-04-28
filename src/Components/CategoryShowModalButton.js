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

const CategoryShowModalButton = ({Icon, desc, CategoryModalComponent, categorySet=[]}) => {
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
                <CategoryModalComponent onModalOpenClick={onModalOpenClick} categorySet={categorySet}/>
            )}
        </>
    );
};

CategoryShowModalButton.propTypes = {
    Icon: PropTypes.any,
    CategoryModalComponent: PropTypes.any,
    desc: PropTypes.string,
    categorySet: PropTypes.array,
};

export default CategoryShowModalButton;
