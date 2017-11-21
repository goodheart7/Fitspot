import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import Input from '@shared/components/Form/Input';
import Textarea from '@shared/components/Form/Textarea';

const validate = values => {
    const errors = {};
    if(!values.invitations) {
        errors.invitations = 'Required'
    }
    if (!values.employeeEmails || !values.employeeEmails.length) {
        errors.employeeEmails = { _error: 'At least one email must be entered' }
    } else {
        const emailsArrayErrors = [];
        values.employeeEmails.forEach((email, emailIndex) => {
            const emailErrors = {};
            if (!email || !email.email) {
                emailErrors.email = 'Required';
                emailsArrayErrors[emailIndex] = emailErrors;
            }
            if(email.email) {
                let reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if(!reg.test(email.email)) {
                    emailErrors.email = 'Invalid email';
                    emailsArrayErrors[emailIndex] = emailErrors;
                }
            }
        });
        if(emailsArrayErrors.length) {
            errors.employeeEmails = emailsArrayErrors
        }
    }
    return errors
};

const removeButtonStyle = {
    fontSize: 26,
    color: '#a7a7a7',
    right: 10,
    top: '17',
};
const indexStyle = {
    fontSize: 22,
    color: '#282828',
    left: 15,
    fontWeight: 600,
    top: '20',
};
const inputStyle = {
    paddingLeft: 45,
    fontSize: 22,
    paddingRight: 45
};

const renderEmails = ({ fields, meta: { touched, error, submitFailed } }) => (
    <div className="col-xs-12">
        {fields.map((email, index) =>
            <div key={index} className="fieldArray-container relative">
                <div className="absolute-link left" style={indexStyle}>
                    {index + 1}
                </div>
                <button
                    type="button"
                    title="Remove rule"
                    className="btn btn-link absolute-link right"
                    style={removeButtonStyle}
                    onClick={() => fields.remove(index)}>
                    <i className="fa fa-times-circle" />
                </button>
                <Field
                    style={inputStyle}
                    name={`${email}.email`}
                    type="text"
                    component={Input}
                />
            </div>
        )}
        <div className="text-center"><button type="button" className="btn btn-link" onClick={() => fields.push({})}>+ Add Employee</button></div>
        {(touched || submitFailed) && error && <div className="alert alert-danger">{error}</div>}
    </div>
);

class AddEmployeeEmails extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        const { handleSubmit, isFetching } = this.props;

        const customP = {
            padding: '20px 0'
        };

        return (
            <div>
                <form onSubmit={handleSubmit} >
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-sm-offset-3 marginBottom50">
                                <h2 className="marginBottom50 text-center">
                                    Add Employee Emails
                                </h2>
                                <FieldArray placeholder='example@example.com' name="employeeEmails" component={renderEmails} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                                <h2 className="marginBottom50 text-center">
                                    Send Invitations
                                </h2>
                                <div className="border-bottom border-top marginBottom50 textarea">
                                    <p style={customP}>Hello &lt;Employee Name&gt; </p>

                                    <Field
                                        name='invitation'
                                        component={Textarea}
                                    />

                                    <p>&lt;Join Fitspot Button&gt;</p>
                                    <p>Best, <br/> &lt;Contact First Name&gt; &lt;Contact Last Name&gt;</p>
                                </div>
                                <button  type="submit" className="btn btn-block btn-info" disabled={isFetching}>Send Invitations</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
};

export default reduxForm({
    form: 'AddEmployeeEmails',
    destroyOnUnmount: true,
    initialValues: {
        employeeEmails: [{}],
        invitation: 'We have just partnered with Fitspot to deliver team workouts to you! Fitspot focuses on providing great team experiences across a variety of workout areas led by a fitness instructors in-office and on your time. Areas include Yoga, Boxing, Meditation and BootCamp. Tap below to join their workouts:'
    },
    validate
})(AddEmployeeEmails)