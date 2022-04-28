import React from 'react';
import PropTypes from 'prop-types';

const SelectBox = ({ options, onChange, name }) => {
    return (
        <select style={{ height: 'fitContent'}} name={name} onChange={onChange}>
            <option
                key={0}
                value={null}
            >
                {'카테고리 선택'}
            </option>
            {options.map((option) => (
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
};

export default SelectBox;