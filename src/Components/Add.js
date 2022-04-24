import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ADD } from '../reducer';
import { useDispatch } from '../context';
import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ToDoModel from '../models/ToDoModel';
import { errorResponse } from '../models/AccountModel';
import Loader from '../Components/Loader';
import PropTypes from 'prop-types';
import SelectBox from '../Components/SelectBox';
import { MdNoteAdd } from 'react-icons/all';

const InputDiv = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
`;

const TextArea = styled.textarea`
    font-size: 15px;
    width: 80%;
    padding: 0 5px;
    margin: auto;
    outline: 0px;
    border: ${props => (props.error ? '1px solid red' : '1px solid black')};
    border-radius: 5px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    margin-top: 20px;
`;

const StyledButton = styled.button`
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

const Button = React.memo(({ children }) => {
    return <StyledButton>{children}</StyledButton>;
});

Button.propTypes = {
    children: PropTypes.node,
};

const StyledBold = styled.b``;

const Bold = React.memo(({ children }) => {
    return <StyledBold>{children}</StyledBold>;
});

Bold.propTypes = {
    children: PropTypes.node,
};

const StyledDatePicker = styled(DatePicker)`
    margin-top: 5px;
`;

const MemoDatePicker = React.memo(props => {
    return <StyledDatePicker {...props} />;
});

const CategoryAddArea = styled.div`
    display: flex;
    font-size: 15px;
    align-items: center;
    
    cursor: pointer;
`

const Add = ({ categorySet }) => {
    const [newToDo, setNewToDo] = useState({
        toDoText: '',
        toDoDeadLine: '',
        toDoCategory: '',
    });
    const [inputError, setInputError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const memoInput = useRef();

    const dispatch = useDispatch();

    const postToDo = async _newToDo => {
        const { toDoText: text, toDoDeadLine: deadLine, toDoCategory: categoryId } = _newToDo;
        try {
            const {
                data: { message, id },
            } = await ToDoModel.postToDo({ text, deadLine, categoryId });
            return { message, id };
        } catch (e) {
            console.log(e);
            setIsLoading(false);
            errorResponse(e.response);
        }
    };

    const onSubmit = useCallback(
        async e => {
            e.preventDefault();
            if (newToDo.toDoText) {
                setIsLoading(true);
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
                        ...newToDo,
                        toDoText: '',
                        toDoDeadLine: '',
                    });
                }
            } else {
                memoInput.current.focus();
                setInputError(true);
            }
            setIsLoading(false);
        },
        // eslint-disable-next-line
        [newToDo],
    );

    const onChange = e => {
        setNewToDo({
            ...newToDo,
            [e.target.name]: e.target.value,
        });
        if (inputError) {
            setInputError(false);
        }
    };

    const onChangeDate = useCallback(
        date => {
            setNewToDo(prevState => ({
                ...prevState,
                toDoDeadLine: date,
            }));
        },
        // eslint-disable-next-line
        [newToDo.toDoDeadLine],
    );

    const minDate = useMemo(() => {
        return new Date();
        // eslint-disable-next-line
    }, [newToDo.toDoDeadLine]);

    return (
        <Form onSubmit={onSubmit}>
            <InputDiv>
                <div>
                    <CategoryAddArea>
                        <MdNoteAdd />
                        Click to Add
                    </CategoryAddArea>
                    <SelectBox
                        name='toDoCategory'
                        onChange={onChange}
                        options={categorySet}
                    />
                </div>
                <TextArea
                    rows={5}
                    ref={memoInput}
                    name='toDoText'
                    type='text'
                    value={newToDo.toDoText}
                    placeholder='To Memo Your Jobs Add To Dos'
                    onChange={onChange}
                    error={inputError}
                />
            </InputDiv>
            <Bold>Until When? ⏰</Bold>
            <MemoDatePicker
                name='toDoDeadLine'
                selected={newToDo.toDoDeadLine}
                onChange={onChangeDate}
                timeInputLabel='Time:'
                dateFormat='yyyy/MM/dd h:mm aa'
                popperPlacement='auto'
                minDate={minDate}
                showTimeInput
                relativeSize
            />
            {isLoading ? (
                <Loader size={'40'} outerSize={'8'} color={'#b68973'} />
            ) : (
                <Button>ADD</Button>
            )}
        </Form>
    );
};

Add.propTypes = {
    categorySet: PropTypes.array,
};

export default Add;
