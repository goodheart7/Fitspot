import React, { PropTypes } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';

const DropdownSelect = (props) => {
    const { input, type, label, data, labelExtra, placeholder, meta, ...rest } = props;

    let className = props.className || "form-group";
    if (meta.touched && meta.error) {
        className += " has-error";
    }
    return (
        <div className={className}>
            <label htmlFor={input.name}>{label}{labelExtra}</label>
            <DropdownList {...input} data={data} valueField={rest.valueField} textField={rest.textField}/>
            {meta.touched && meta.error && <span className="help-block">{meta.error}</span>}
        </div>
    );
};

export default DropdownSelect;