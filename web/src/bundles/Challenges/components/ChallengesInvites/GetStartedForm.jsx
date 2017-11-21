import React, {Component, PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import DropdownSelect from '@shared/components/Form/DropdownSelect';
import {Link} from 'react-router';


const GetStartedForm = (props) => {
    const { handleSubmit, pristine, previousPage, submitting } = props
    return (
        <div>
            <h4 className="marginBottom20">Let's Get Started!</h4>
            <p>Congratulations on starting your challenge! Add a bit more info to get started.</p>
            <form onSubmit={handleSubmit}>
                <Field
                    className="form-group"
                    name="division"
                    component={DropdownSelect}
                    data={props.divisions}
                    valueField="value"
                    textField="value"/>
                <div>
                    <button type="submit" className="btn btn-default btn-block" disabled={submitting}>Join</button>
                </div>
            </form>
        </div>
    )
}
export default reduxForm({
    form: 'InviteWizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    initialValues: {
        division: 'Strategy'
    }
})(GetStartedForm)