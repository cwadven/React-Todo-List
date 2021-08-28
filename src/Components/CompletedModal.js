import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/all';
import styled from '@emotion/styled';
import ToDoModel from '../models/ToDoModel';
import { errorResponse } from '../models/AccountModel';
import Loader from '../Components/Loader';
import { arrayInObjectSort } from '../common.js';

const ModalDeactivateButton = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;

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
    max-height: 500px;
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

const CompletedContainer = styled.div`
    width: 80vw;
    max-width: 490px;
    height: 100vw;
    max-height: 500px;
    margin: 50px 0px 5px 0px;
    padding: 0 10px;
    overflow: auto;
    overflow-wrap: break-word;
    text-align: justify;
`;

const CompletedItemContainer = styled.div`
    &:not(:first-child) {
        margin-top: 10px;
    }
`;

const CompletedDate = styled.div`
    text-align: left;
    font-size: 15px;
`;

const CompletedModal = ({ onModalOpenClick }) => {
    const [completedSet, setCompletedSet] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const requestCompletedSet = async () => {
            try {
                let {
                    data: { completed_set },
                } = await ToDoModel.getCompletedList();
                completed_set = arrayInObjectSort(
                    completed_set,
                    'completedDate',
                    'asc',
                    'date',
                );
                return completed_set;
            } catch (e) {
                console.log(e);
                errorResponse(e.response);
            }
        };

        const requestThenSetCompletedSet = async () => {
            let completed_set = await requestCompletedSet();
            await setCompletedSet(completed_set);
            setIsLoading(false);
        };

        document.body.style.overflow = 'hidden';
        requestThenSetCompletedSet();

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <Container>
            <Modal>
                <ModalTitle>All Completed ToDos</ModalTitle>
                <ModalDeactivateButton onClick={onModalOpenClick}>
                    <AiOutlineClose size={30} />
                </ModalDeactivateButton>
                <hr />
                {isLoading ? (
                    <Loader />
                ) : (
                    <CompletedContainer>
                        {completedSet.map(completed => {
                            return (
                                <CompletedItemContainer>
                                    <CompletedDate>
                                        {new Date(
                                            completed.completedDate,
                                        ).toLocaleDateString()}
                                    </CompletedDate>
                                    <div>{completed.text}</div>
                                </CompletedItemContainer>
                            );
                        })}
                    </CompletedContainer>
                )}
            </Modal>
        </Container>
    );
};

export default CompletedModal;
