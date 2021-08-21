import React, {useState} from 'react';
import {ADD} from "../reducer";
import {useDispatch} from "../context";

export default () => {
    const [newToDo, setNewToDo] = useState("");
    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();
        dispatch({type: ADD, payload: newToDo});
        setNewToDo('');
    }

    const onChange = e => {
        const {target: {value}} = e;
        setNewToDo(value);
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" value={newToDo} placeholder="Write to do" onChange={onChange}/>
        </form>
    )
}
