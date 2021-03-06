import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form'


const Checkbox = (props) => {
    const { input, type, label, labelExtra, placeholder, meta } = props;

    let className = props.className || "form-group";
    if (meta.touched && meta.error) {
        className += " has-error";
    }

    return (
        <div className={className}>
            <label htmlFor={input.name}>
                <input
                    {...input}
                    id={input.name}
                    type={'checkbox'}
                    placeholder={placeholder || ''}
                />
                <span className="cr"><i className="cr-icon fa fa-check"/></span>
                {label}{labelExtra}
                </label>
            {meta.touched && meta.error && <span className="help-block">{meta.error}</span>}
        </div>
    );
};

export default Checkbox;
