import React from 'react';
import PropTypes from 'prop-types';

const SelectBox = ({ options, onChange, name }) => {
    return (
        <select name={name} onChange={onChange}>
            <option
                key={0}
                value={null}
            >
                {null}
            </option>
            {options.map((option) => (
                <option
                    key={option.id}
                    value={option.name}
                >
                    {option.name}
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