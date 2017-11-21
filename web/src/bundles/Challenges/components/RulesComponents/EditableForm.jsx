import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input';
import DropdownSelect from '@shared/components/Form/DropdownSelect';
const Reactable = require('reactable');
const Tr = Reactable.Tr;

const TYPES = [
    {
        value: 'Sleep'
    },
    {
        value: 'Run'
    },
    {
        value: 'Jump'
    }
];
const RULES = [
    {
        value: 'Per Workout'
    },
    {
        value: 'Per Night'
    },
    {
        value: 'Per Day'
    },
    {
        value: 'Per Unit'
    }
];
const validate = (values) => {
    const errors = {};
    if (!values.rule) {
        errors.rule = 'Rule Required';
    }
    if (!values.name) {
        errors.name = 'Name Required';
    }
    if (!values.maxPoints) {
        errors.maxPoints = 'Amount Required';
    }
    if(!values.points) {
        errors.points = 'Points Required';
    }
    return errors;
};

let EditableForm = (props) => {
    const { handleSubmit, title, valid, initialValues} = props;
    return (
        <tr>
            <td style={{display: 'none'}}>
                <form onSubmit={handleSubmit} id="editform"/>
            </td>
            <td>
                {initialValues.id}
            </td>
            <td>
                <Field form="editform" name="name" className="custom-field" component={Input} type="text" />
            </td>
            <td style={{minWidth: 160}}>
                <Field
                    form='editform'
                    name="rule"
                    component={DropdownSelect}
                    data={RULES}
                    valueField="value"
                    textField="value"/>
            </td>
            <td>
                <div>
                    <Field form='editform' name="maxPoints" className="custom-field col-xs-6" component={Input} type="number" />
                </div>
            </td>
            <td >
                <Field form='editform' name="points" className="custom-field col-xs-6" component={Input} type="number" />
            </td>
            <td>
                <div className="checkbox">
                    <label>
                        <input name={initialValues.name} onChange={(e) => this._activeChange(e)} type="checkbox"/>
                        <span className="cr"><i className="cr-icon fa fa-check"/></span>
                    </label>
                </div>
            </td>
            <td style={{minWidth: 130}}>
                <div>
                    <button type='submit' disabled={!valid} form="editform" className="btn-link">
                        <b>Save</b>
                    </button>
                    <button className="btn-link" onClick={(id) => props.closeEdit(initialValues.id)}>
                        <b>Close</b>
                    </button>
                </div>
            </td>
        </tr>
        
    );
};

EditableForm = reduxForm({
    form: 'EditableForm',
    enableReinitialize : true,
    validate
})(EditableForm);

export default EditableForm;
