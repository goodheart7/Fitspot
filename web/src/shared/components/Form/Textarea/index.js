import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form'


const Textarea = (props) => {
    const { input, type, label, labelExtra, placeholder, meta, style } = props;

    let className = props.className || "form-group";
    if (meta.touched && meta.error) {
        className += " has-error";
    }

    return (
        <div className={className}>
            <label htmlFor={input.name}>{label}{labelExtra}</label>
            <textarea
                {...input}
                id={input.name}
                style={style}
                className="form-control"
                type={type || 'text'}
                placeholder={placeholder || ''}
            />
            {meta.touched && meta.error && <span className="help-block">{meta.error}</span>}
        </div>
    );
};

export default Textarea;
