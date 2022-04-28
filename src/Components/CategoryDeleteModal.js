import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/all';
import styled from '@emotion/styled';
import ToDoModel from '../models/ToDoModel';
import Loader from '../Components/Loader';
import PropTypes from 'prop-types';
import { errorResponse } from '../models/AccountModel';
import { SET_CATEGORY, SET_TODO_WITH_DELETED_CATEGORY_NAME } from '../reducer';
import { useDispatch } from '../context';
import SelectBox from '../Components/SelectBox';
import { isNumeric } from '../common';

const ModalDeactivateButton = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;

    margin: 0 3px;
    display: inline-flex;
    background: transparent;
    border: transparent;
`;

const ModalTitle = styled.div`
    position: absolute;
    left: 10px;
    top: 10px;
`;

const Container = styled.div`
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 100%;
    height: 100%;
    background: #0000003b;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`;

const Modal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 80vw;
    max-width: 500px;
    height: 100vw;
    max-height: 200px;
    background: linear-gradient(
        169deg,
        rgba(224, 196, 182, 1) 0%,
        rgba(182, 137, 115, 1) 100%
    );
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    border: 1px solid #1e212d;
    border-radius: 10px;
`;

const CategoryContainer = styled.div`
    width: 80vw;
    max-width: 480px;
    height: 100vw;
    max-height: 200px;
    margin: 50px 0px 5px 0px;
    padding: 0 10px;
    overflow: auto;
    overflow-wrap: break-word;
    text-align: center;
`;

const StyledCategoryButton = styled.button`
    width: 100px;
    color: #f5f5f5;
    cursor: pointer;
    background-color: #1e212d;
    padding: 4px 5px;
    border-radius: 5px;
    margin: 5px;
    transition: 0.2s linear;

    &:hover {
        background-color: #6e707b;
    }
`;

const CategoryDeleteModal = ({ onModalOpenClick, categorySet }) => {
    const [categoryId, setCategoryId] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const onChange = e => {
        if (isNumeric(e.target.value)) {
            setCategoryId(Number(e.target.value));
        } else {
            setCategoryId(undefined);
        }
    };

    const getCategorySet = async () => {
        try {
            const {
                data: { category_set },
            } = await ToDoModel.getCategorySet();
            return category_set;
        } catch (e) {
            console.log(e);
            errorResponse(e.response);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const onSubmit = async () => {
        setIsLoading(prevState => !prevState);

        try {
            await ToDoModel.deleteCategory(categoryId);
            const categorySet = await getCategorySet();
            dispatch({ type: SET_CATEGORY, payload: categorySet });
            dispatch({
                type: SET_TODO_WITH_DELETED_CATEGORY_NAME,
                payload: { categoryId: categoryId },
            });
            onModalOpenClick();
        } catch (e) {
            console.log(e);
            errorResponse(e.response);
        }
        setIsLoading(prevState => !prevState);
    };

    return (
        <Container>
            <Modal>
                <ModalTitle>Category Delete</ModalTitle>
                <ModalDeactivateButton onClick={onModalOpenClick}>
                    <AiOutlineClose size={30} />
                </ModalDeactivateButton>
                <hr />
                {isLoading ? (
                    <Loader size={'64'} outerSize={'8'} />
                ) : (
                    <CategoryContainer>
                        <div style={{ textAlign: 'center' }}>
                            <SelectBox
                                name='categoryId'
                                onChange={onChange}
                                options={categorySet}
                            />
                        </div>
                        {categoryId ? <StyledCategoryButton onClick={onSubmit}>DELETE</StyledCategoryButton> : null}
                    </CategoryContainer>
                )}
            </Modal>
        </Container>
    );
};

CategoryDeleteModal.propTypes = {
    onModalOpenClick: PropTypes.func,
    categorySet: PropTypes.array,
};

export default CategoryDeleteModal;
