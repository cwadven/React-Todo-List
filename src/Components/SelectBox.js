import React from 'react';
import PropTypes from 'prop-types';

const SelectBox = ({ options, onChange, name, defaultValue=undefined }) => {
    return (
        <select style={{ height: 'fitContent'}} name={name} onChange={onChange} value={defaultValue}>
            <option
                key={0}
                value={undefined}
            >
                {'카테고리 선택'}
            </option>
            {options && options.length && options.map((option) => (
                <option
                    key={option.id}
                    value={option.id}
                >
                    {option.name} ({option.orderNumber})
                </option>
            ))}
        </select>
    );
};

SelectBox.propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func,
    name: PropTypes.string,
    defaultValue: PropTypes.number,
};

export default SelectBox;