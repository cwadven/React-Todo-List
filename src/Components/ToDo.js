import React, {useEffect, useRef, useState} from 'react';
import {COMPLETE, DELETE, EDIT, UNCOMPLETE} from "../reducer";
import {useDispatch} from "../context";

export default ({text, id, isCompleted}) => {
    const dispatch = useDispatch();
    const [isEditable, setIsEditable] = useState(false);
    const [edit, setEdit] = useState(text);

    const inputRef = useRef(null);

    const editExit = async () => {
        await setIsEditable(prevState => (!prevState));
        setEdit(text);
    }

    const onEditChange = async (e) => {
        setEdit(e.target.value);
    }

    useEffect(() => {
        if (isEditable) {
            inputRef.current.focus()
        }
    }, [isEditable])

    return (
        <li>
            {isEditable ? (
                    <input type="text" ref={inputRef} value={edit} placeholder="Write to do" onChange={onEditChange}/>
                ) :
                <span>{text}</span>
            }

            {!isCompleted &&
            <button onClick={editExit}>
                {isEditable ? "EXIT" : "EDIT"}
            </button>
            }

            {isEditable ? (
                    <button onClick={() => {
                        setIsEditable(false);
                        dispatch({type: EDIT, payload: {id, edit}});
                    }}>
                        CHANGE
                    </button>) :
                <>
                    <button onClick={() => {
                        dispatch({type: DELETE, payload: id})
                    }}>DELETE
                    </button>
                    <button onClick={() => {
                        dispatch({type: isCompleted ? UNCOMPLETE : COMPLETE, payload: id})
                    }}>{isCompleted ? "UNCOMPLETE" : "COMPELTE"}
                    </button>
                </>
            }
        </li>
    )
}