import React, { useEffect, useRef, useState } from 'react';
import { COMPLETE, DELETE, EDIT, UNCOMPLETE } from '../reducer';
import { useDispatch } from '../context';
import styled from '@emotion/styled';
import {
    AiFillDelete,
    AiOutlineCheckCircle,
    AiOutlineEdit,
    AiOutlineFileDone,
    AiOutlineFileSync,
    AiOutlineRollback,
} from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import LeftTimeCounter from './LeftTimeCounter';
import ToDoModel from '../models/ToDoModel';
import { errorResponse } from '../models/AccountModel';
import Loader from '../Components/Loader';

const Container = styled.article`
    background: #eabf9f;
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid #1e212d;
`;

const Text = styled.div`
    color: #1e212d;
    font-weight: bold;
    font-size: 15px;
`;

const Input = styled.input`
    display: block;
    font-size: 15px;
    margin: 0px;
    width: 100%;
`;

const ButtonContainer = styled.div`
    text-align: center;
    margin-top: 10px;
`;

const DeadLine = styled.div`
    text-align: right;
    font-size: 15px;
`;

const CompletedDate = styled.div`
    text-align: right;
    font-size: 15px;
`;

const DatePickerContainer = styled.div`
    text-align: right;
    margin-bottom: 5px;
`;

const StyledAiOutlineRollback = styled(AiOutlineRollback)`
    cursor: pointer;

    &:hover {
        color: #faf3e0;
    }
`;
const StyledAiOutlineEdit = styled(AiOutlineEdit)`
    cursor: pointer;

    &:hover {
        color: #faf3e0;
    }
`;
const StyledAiOutlineCheckCircle = styled(AiOutlineCheckCircle)`
    cursor: pointer;

    &:hover {
        color: #faf3e0;
    }
`;
const StyledAiOutlineFileSync = styled(AiOutlineFileSync)`
    cursor: pointer;

    &:hover {
        color: #faf3e0;
    }
`;
const StyledAiOutlineFileDone = styled(AiOutlineFileDone)`
    cursor: pointer;

    &:hover {
        color: #faf3e0;
    }
`;
const StyledAiFillDelete = styled(AiFillDelete)`
    cursor: pointer;

    &:hover {
        color: #faf3e0;
    }
`;

const ToDo = ({
    text,
    deadLine,
    startDate,
    completedDate,
    id,
    isCompleted,
}) => {
    const dispatch = useDispatch();
    const [isEditable, setIsEditable] = useState(false);
    const [edit, setEdit] = useState(text);
    const [editDeadLine, setEditDeadLine] = useState(deadLine);

    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef(null);

    const editExit = async () => {
        await setIsEditable(prevState => !prevState);
        setEdit(text);
        setEditDeadLine(deadLine);
    };

    const onEditChange = e => {
        setEdit(e.target.value);
    };

    const onEditDeadLineChange = date => {
        setEditDeadLine(date);
    };

    const editToDo = async data => {
        await setIsLoading(true);
        try {
            const {
                data: { message },
            } = await ToDoModel.putToDoDetail(data);
            return message;
        } catch (e) {
            console.log(e);
            await setIsLoading(false);
            errorResponse(e.response);
        }
    };

    const onEditSubmit = async () => {
        if (edit) {
            const message = await editToDo({
                id: id,
                text: edit,
                deadLine: editDeadLine,
            });
            if (message === 'success') {
                setIsEditable(false);
                await setIsLoading(false);
                dispatch({
                    type: EDIT,
                    payload: { id, edit, editDeadLine },
                });
            }
        } else {
            alert('Write To Do');
            await setIsLoading(false);
            inputRef.current.focus();
        }
    };

    const completedStatusTodo = async () => {
        await setIsLoading(true);
        try {
            const {
                data: { message },
            } = await ToDoModel.changeCompletedStatus({
                id,
                isCompleted,
            });
            return message;
        } catch (e) {
            console.log(e);
            await setIsLoading(false);
            errorResponse(e.response);
        }
    };

    const onCompletedStatusChange = async () => {
        await completedStatusTodo();
        await setIsLoading(false);
        dispatch({
            type: isCompleted ? UNCOMPLETE : COMPLETE,
            payload: id,
        });
    };

    const deleteToDo = async _id => {
        try {
            const {
                data: { message },
            } = await ToDoModel.deleteToDoDetail(_id);
            return message;
        } catch (e) {
            console.log(e);
            errorResponse(e.response);
        }
    };

    const onDeleteDoDo = async () => {
        if (window.confirm('Are u sure you want to delete?')) {
            const message = await deleteToDo(id);
            if (message === 'success') {
                dispatch({ type: DELETE, payload: id });
            }
        }
    };

    useEffect(() => {
        if (isEditable) {
            inputRef.current.focus();
        }
    }, [isEditable]);

    return (
        <Container>
            {isEditable ? (
                <>
                    <DatePickerContainer>
                        <DatePicker
                            name="toDoDeadLine"
                            selected={editDeadLine}
                            onChange={onEditDeadLineChange}
                            timeInputLabel="Time:"
                            dateFormat="yyyy/MM/dd h:mm aa"
                            popperPlacement="auto"
                            minDate={new Date()}
                            showTimeInput
                            relativeSize
                        />
                    </DatePickerContainer>
                    <Input
                        type="text"
                        ref={inputRef}
                        value={edit}
                        placeholder="To Memo Your Jobs"
                        onChange={onEditChange}
                    />
                </>
            ) : (
                <>
                    {deadLine ? (
                        !isCompleted ? (
                            <DeadLine>
                                {deadLine.toLocaleString()} 까지
                            </DeadLine>
                        ) : (
                            <CompletedDate>
                                {completedDate.toLocaleString()} 완료
                            </CompletedDate>
                        )
                    ) : !isCompleted ? (
                        <DeadLine>기간설정안함</DeadLine>
                    ) : (
                        <CompletedDate>
                            {completedDate.toLocaleString()} 완료
                        </CompletedDate>
                    )}
                    <Text>{text}</Text>

                    {deadLine && !isCompleted ? (
                        <>
                            <LeftTimeCounter
                                deadLine={deadLine}
                                startDate={startDate}
                            />
                        </>
                    ) : (
                        ''
                    )}
                </>
            )}

            <ButtonContainer>
                {!isCompleted &&
                    (isEditable ? (
                        <StyledAiOutlineRollback onClick={editExit} size={30} />
                    ) : (
                        <StyledAiOutlineEdit onClick={editExit} size={30} />
                    ))}
                {isEditable ? (
                    isLoading ? (
                        <div style={{ display: 'inline-block' }}>
                            <Loader size={'20'} outerSize={'3'} margin={'0'} />
                        </div>
                    ) : (
                        <StyledAiOutlineCheckCircle
                            onClick={onEditSubmit}
                            size={30}
                        />
                    )
                ) : (
                    <>
                        {isCompleted ? (
                            isLoading ? (
                                <div style={{ display: 'inline-block' }}>
                                    <Loader
                                        size={'20'}
                                        outerSize={'3'}
                                        margin={'0'}
                                    />
                                </div>
                            ) : (
                                <StyledAiOutlineFileSync
                                    onClick={onCompletedStatusChange}
                                    size={30}
                                />
                            )
                        ) : isLoading ? (
                            <div style={{ display: 'inline-block' }}>
                                <Loader
                                    size={'20'}
                                    outerSize={'3'}
                                    margin={'0'}
                                />
                            </div>
                        ) : (
                            <StyledAiOutlineFileDone
                                onClick={onCompletedStatusChange}
                                size={30}
                            />
                        )}

                        <StyledAiFillDelete onClick={onDeleteDoDo} size={30} />
                    </>
                )}
            </ButtonContainer>
        </Container>
    );
};

export default ToDo;
