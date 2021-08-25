import React, { useRef, useState } from 'react';
import { ADD } from '../reducer';
import { useDispatch } from '../context';
import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ToDoModel from '../models/ToDoModel';
import { errorResponse } from '../models/AccountModel';

const Input = styled.input`
    font-size: 15px;
    width: 80%;
    padding: 0 5px;
    margin: auto;
    height: 30px;
    outline: 0px;
    border: ${props => (props.error ? '1px solid red' : '1px solid black')};
    border-radius: 5px;
`;

const Form = styled.form`
    text-align: center;
`;

const Button = styled.button`
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

const Bold = styled.b``;

const DatePickerContainer = styled.div`
    margin-top: 5px;
`;

const Add = () => {
    const [newToDo, setNewToDo] = useState({
        toDoText: '',
        toDoDeadLine: '',
    });
    const [inputError, setInputError] = useState(false);

    const memoInput = useRef();

    const dispatch = useDispatch();

    const postToDo = async _newToDo => {
        const { toDoText: text, toDoDeadLine: deadLine } = _newToDo;
        try {
            const {
                data: { message, id },
            } = await ToDoModel.postToDo({ text, deadLine });
            return { message, id };
        } catch (e) {
            console.log(e);
            errorResponse(e.response);
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (newToDo.toDoText) {
            const { message, id } = await postToDo(newToDo);
            if (message === 'success') {
                dispatch({
                    type: ADD,
                    payload: {
                        ...newToDo,
                        id: id,
                        startDate: new Date(),
                        completedDate: '',
                    },
                });
                setNewToDo({
                    toDoText: '',
                    toDoDeadLine: '',
                });
            }
        } else {
            memoInput.current.focus();
            setInputError(true);
        }
    };

    const onChange = e => {
        setNewToDo({
            ...newToDo,
            [e.target.name]: e.target.value,
        });
        if (inputError) {
            setInputError(false);
        }
    };

    const onChangeDate = date => {
        setNewToDo(prevState => ({
            ...prevState,
            toDoDeadLine: date,
        }));
    };

    return (
        <Form>
            <Input
                ref={memoInput}
                name="toDoText"
                type="text"
                value={newToDo.toDoText}
                placeholder="To Memo Your Jobs Add To Dos"
                onChange={onChange}
                error={inputError}
            />
            <DatePickerContainer>
                <Bold>Until When? ⏰</Bold>
                <DatePicker
                    name="toDoDeadLine"
                    selected={newToDo.toDoDeadLine}
                    onChange={onChangeDate}
                    timeInputLabel="Time:"
                    dateFormat="yyyy/MM/dd h:mm aa"
                    popperPlacement="auto"
                    minDate={new Date()}
                    showTimeInput
                    relativeSize
                />
            </DatePickerContainer>
            <div>
                <Button onClick={onSubmit}>ADD</Button>
            </div>
        </Form>
    );
};
export default Add;
