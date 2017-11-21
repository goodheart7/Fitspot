import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import Input from '@shared/components/Form/Input';
import Textarea from '@shared/components/Form/Textarea';

const validate = values => {
    const errors = {};
    if(!values.department) {
        errors.department = 'Required'
    }
    if(!values.office) {
        errors.office = 'Required'
    }
    if (!values.offices || !values.offices.length) {
        errors.offices = { _error: 'At least one email must be entered' }
    } else {
        const officesArrayErrors = [];
        values.offices.forEach((office, officeIndex) => {
            const officeErrors = {};
            if (!office || !office.office) {
                officeErrors.office = 'Required';
                officesArrayErrors[officeIndex] = officeErrors
            }
        });
        if(officesArrayErrors.length) {
            errors.offices = officesArrayErrors
        }
    }
    if (!values.departments || !values.departments.length) {
        errors.departments = { _error: 'At least one email must be entered' }
    } else {
        const departmentsArrayErrors = [];
        values.departments.forEach((department, departmentIndex) => {
            const departmentErrors = {};
            if (!department || !department.department) {
                departmentErrors.department = 'Required';
                departmentsArrayErrors[departmentIndex] = departmentErrors
            }
        });
        if(departmentsArrayErrors.length) {
            errors.department = departmentsArrayErrors
        }
    }
    return errors
};

class AddDepartments extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            offices: props.company.officeLocations,
            departments: props.company.departments
        }
    }
    removeItem(data, id) {
        let _arr = data;
        let index = _arr.findIndex((item) => item.id === id);
        _arr.splice(index, 1);
        return _arr;
    }
    onRemoveDepartment = (id) => {
        const { removeDepartment } = this.props;
        const { departments } = this.state;
        this.setState({departments: this.removeItem(departments, id)});
        removeDepartment(id);
    };
    onRemoveOffice = (id) => {
        const { offices } = this.state;
        const { removeOffice } = this.props;
        this.setState({offices: this.removeItem(offices, id)});
        removeOffice(id);
    };
    render(){
        const { handleSubmit, isFetching, isOnboard } = this.props;
        const { offices, departments } = this.state;
        const removeButtonStyle = {
            fontSize: 26,
            color: '#a7a7a7',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)'
        };
        const indexStyle = {
            fontSize: 22,
            color: '#282828',
            left: 15,
            fontWeight: 600,
            top: '50%',
            transform: 'translateY(-50%)'
        };
        const inputStyle = {
            paddingLeft: 45,
            fontSize: 22,
            paddingRight: 45
        };
        const customP = {
            padding: '20px 0'
        };

        const renderDepartments = ({ fields, meta: { touched, error, submitFailed } }) => (
            <div className="col-xs-12">
                {fields.map((department, index) =>
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
                            name={`${department}.name`}
                            type="text"
                            component={Input}
                        />
                    </div>
                )}
                <div className="text-center marginBottom20"><button type="button" className="btn btn-link" onClick={() => fields.push({})}>+ Add Department</button></div>
                {(touched || submitFailed) && error && <div className="alert alert-danger">{error}</div>}
            </div>
        );

        const renderOffices = ({ fields, meta: { touched, error, submitFailed } }) => (
            <div className="col-xs-12">
                {fields.map((office, index) =>
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
                            name={`${office}.name`}
                            type="text"
                            component={Input}
                        />
                    </div>
                )}
                <div className="text-center marginBottom20"><button type="button" className="btn btn-link" onClick={() => fields.push({})}>+ Add Office</button></div>
                {(touched || submitFailed) && error && <div className="alert alert-danger">{error}</div>}
            </div>
        );
        const renderCurrentDepartments = departments.map((c, index) => (
            <li>
                {c.name}
                <a onClick={(id) => this.onRemoveDepartment(c.id)}><i className="fa fa-times"></i></a>
            </li>
        ));
        const renderCurrentOffices = offices.map((o, index) => (
            <li>
                {o.name}
                <a onClick={(id) => this.onRemoveOffice(o.id)}><i className="fa fa-times"></i></a>
            </li>
        ));
        return (
            <div>
                <form onSubmit={handleSubmit} >
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-sm-offset-3 marginBottom50">
                                <h2 className="marginBottom20 text-center">
                                    Add Departments & Offices
                                </h2>
                                <p className="text-center">Add departments and offices so that we can track progress and challenges across departments and offices</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-sm-offset-3 border-top">
                                <h2 className="text-center paddingTop50">
                                    Departments
                                </h2>
                                {renderCurrentDepartments.length ? <h4 className="text-center">Current Departments</h4> : ''}
                                <ul className="data-chips">
                                    {renderCurrentDepartments}
                                </ul>
                                <FieldArray name="departments" component={renderDepartments} />
                            </div>
                            <div className="col-xs-12 col-sm-6 col-sm-offset-3 border-top border-bottom">
                                <h2 className="paddingTop50 text-center">
                                    Offices
                                </h2>
                                {renderCurrentOffices.length ? <h4 className="text-center">Current Offices</h4> : ''}
                                <ul className="data-chips">
                                    {renderCurrentOffices}
                                </ul>
                                <FieldArray name="offices" component={renderOffices} />
                            </div>
                            <div className="col-xs-12 col-sm-6 col-sm-offset-3 paddingTop50">
                                <button  type="submit" className="btn btn-block btn-info" disabled={isFetching}>{!isOnboard ? 'Continue' : 'Save Changes'}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
};

export default reduxForm({
    form: 'AddDepartments',
    destroyOnUnmount: true,
    validate
})(AddDepartments)