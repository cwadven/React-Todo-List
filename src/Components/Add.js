import React, {useState} from 'react';
import {ADD} from "../reducer";
import {useDispatch} from "../context";
import styled from "@emotion/styled";

const Input = styled.input`
    font-size: 15px;
    width: 80%;
    padding: 0 5px;
    margin: auto;
    height: 30px;
`;

const Form = styled.form`
    text-align: center;
`;

const Button = styled.button`
    color: #f5f5f5;
    cursor: pointer;
    background-color: #1E212D;
    padding: 4px 5px;
    border-radius: 5px;
    margin: 5px;
    transition: 0.2s linear;
    
    &:hover {
        background-color: #6e707b;
    }
`;

export default () => {
    const [newToDo, setNewToDo] = useState("");
    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();
        if (newToDo) {
            dispatch({type: ADD, payload: newToDo});
            setNewToDo('');
        }
    }

    const onChange = e => {
        const {target: {value}} = e;
        setNewToDo(value);
    }

    return (
        <Form onSubmit={onSubmit}>
            <Input type="text" value={newToDo} placeholder="To Memo Your Jobs Add To Dos" onChange={onChange}/>
            <div>
                <Button onClick={onSubmit}>ADD</Button>
            </div>
        </Form>
    )
}
