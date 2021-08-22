import React, {useEffect, useRef, useState} from 'react';
import {COMPLETE, DELETE, EDIT, UNCOMPLETE} from "../reducer";
import {useDispatch} from "../context";
import styled from "@emotion/styled";
import {
    AiFillDelete,
    AiOutlineCheckCircle,
    AiOutlineEdit,
    AiOutlineFileDone,
    AiOutlineFileSync,
    AiOutlineRollback
} from "react-icons/ai";
import DatePicker from "react-datepicker";

const Container = styled.article`
    background: #EABF9F;
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid #1E212D;
`;

const Text = styled.div`
    color: #1E212D;
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
        color: #FAF3E0;
    }
`;

const DeadLine = styled.div`
    text-align: right;
    font-size: 15px;
`;

const DatePickerContainer = styled.div`
    text-align: right;
    margin-bottom: 5px;
`;

export default ({text, deadLine, id, isCompleted}) => {
    const dispatch = useDispatch();
    const [isEditable, setIsEditable] = useState(false);
    const [edit, setEdit] = useState(text);
    const [editDeadLine, setEditDeadLine] = useState(deadLine)

    const inputRef = useRef(null);

    const editExit = async () => {
        await setIsEditable(prevState => (!prevState));
        setEdit(text);
        setEditDeadLine(deadLine);
    }

    const onEditChange = (e) => {
        setEdit(e.target.value);
    }

    const onEditDeadLineChange = (date) => {
        setEditDeadLine(date)
    }

    useEffect(() => {
        if (isEditable) {
            inputRef.current.focus()
        }
    }, [isEditable])

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
                                showTimeInput
                                relativeSize
                            />
                        </DatePickerContainer>
                        <Input type="text" ref={inputRef} value={edit} placeholder="To Memo Your Jobs"
                               onChange={onEditChange}/>
                    </>
                ) :
                <>
                    {deadLine ? <DeadLine>{deadLine.toLocaleString()} 까지</DeadLine> : <DeadLine>기간설정안함</DeadLine>}
                    <Text>{text}</Text>
                </>
            }

            <ButtonContainer>
                {!isCompleted &&
                <Button onClick={editExit}>
                    {isEditable ? <AiOutlineRollback/> : <AiOutlineEdit/>}
                </Button>
                }
                {isEditable ? (
                        <Button onClick={() => {
                            setIsEditable(false);
                            dispatch({type: EDIT, payload: {id, edit, editDeadLine}});
                        }}>
                            <AiOutlineCheckCircle/>
                        </Button>) :
                    <>
                        <Button onClick={() => {
                            dispatch({type: isCompleted ? UNCOMPLETE : COMPLETE, payload: id})
                        }}>{isCompleted ? <AiOutlineFileSync/> : <AiOutlineFileDone/>}
                        </Button>
                        <Button onClick={() => {
                            dispatch({type: DELETE, payload: id})
                        }}><AiFillDelete/>
                        </Button>
                    </>
                }
            </ButtonContainer>
        </Container>
    )
}