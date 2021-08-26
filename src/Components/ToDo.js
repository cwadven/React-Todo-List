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

const Button = styled.button`
    margin: 0 3px;
    display: inline-flex;
    background: transparent;
    border: transparent;
    transition: 0.1s linear;

    &:hover {
        color: #faf3e0;
    }
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
        try {
            const {
                data: { message },
            } = await ToDoModel.putToDoDetail(data);
            return message;
        } catch (e) {
            console.log(e);
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
                dispatch({
                    type: EDIT,
                    payload: { id, edit, editDeadLine },
                });
            }
        } else {
            alert('Write To Do');
            inputRef.current.focus();
        }
    };

    const completedStatusTodo = async () => {
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
            errorResponse(e.response);
        }
    };

    const onCompletedStatusChange = async () => {
        await completedStatusTodo();
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
                {!isCompleted && (
                    <Button onClick={editExit}>
                        {isEditable ? (
                            <AiOutlineRollback size={30} />
                        ) : (
                            <AiOutlineEdit size={30} />
                        )}
                    </Button>
                )}
                {isEditable ? (
                    <Button onClick={onEditSubmit}>
                        <AiOutlineCheckCircle size={30} />
                    </Button>
                ) : (
                    <>
                        <Button onClick={onCompletedStatusChange}>
                            {isCompleted ? (
                                <AiOutlineFileSync size={30} />
                            ) : (
                                <AiOutlineFileDone size={30} />
                            )}
                        </Button>
                        <Button onClick={onDeleteDoDo}>
                            <AiFillDelete size={30} />
                        </Button>
                    </>
                )}
            </ButtonContainer>
        </Container>
    );
};

export default ToDo;
