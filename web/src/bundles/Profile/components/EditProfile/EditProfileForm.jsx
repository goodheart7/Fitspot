import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input';
import InlineButtonList from '@shared/components/Form/InlineButtonList';
import CONSTS from '@utils/Consts';
import AvatarWizardForm from './AvatarWizardForm';
import DropdownSelect from '@shared/components/Form/DropdownSelect';
import DateTimeInput from '@shared/components/Form/DateTimeInput';
const GENDER_LIST = [
  {
    label: 'Male',
    value: CONSTS.GENDER.MALE,
  },
  {
    label: 'Female',
    value: CONSTS.GENDER.FEMALE,
  },
  {
    label: 'Unspecified',
    value: CONSTS.GENDER.UNSPECIFIED,
  },
];
const generateFeet = () => {
    let _temp = [];
    for(let i = 4; i <= 7; ++i){
        _temp.push({
            label: i,
            value: i
        })
    }
    return _temp;
};

const generateInches = () => {
    let _temp = [];
    for(let i = 0; i <= 11; ++i){
        _temp.push({
            label: i,
            value: i
        })
    }
    return _temp;
};

const feet = generateFeet();

const inch = generateInches();
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }

    if (!values.feet) {
        errors.feet = 'Required';
    }

    if (!values.inch) {
        errors.inch = 'Required';
    }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  return errors;
};


class EditProfileForm extends React.Component {

    constructor(props) {
        super(props);
        let realFeet = props.initialValues.customer.height / 30.48; //feet
        props.initialValues.customer.feet = Math.floor(realFeet);
        props.initialValues.customer.inches = Math.round((realFeet - props.initialValues.customer.feet) * 12);
    }
    render(){
        const { handleSubmit, isFetching, error, initialValues, uploadAvatar } = this.props;
        return (
            <div>
                <button type="button" className="btn btn-primary btn-lg btn-block btn-fb marginBottom20">Connect Facebook</button>
                <AvatarWizardForm user={initialValues}/>
                <form onSubmit={handleSubmit}>
                    {error ? <div className="alert alert-danger">{error}</div> : null}
                    <Field name="firstName" label="First Name" type="text" component={Input} className="form-group col-xs-6 kill-left-padding" />
                    <Field name="lastName" label="Last Name" type="text" component={Input} className="form-group col-xs-6 kill-right-padding" />
                    <Field name="customer.birthday" label="Your Birth Date" type="text" calendar time={false}  component={DateTimeInput} />
                    <Field name="customer.weight" label="Your Weight" type="text" component={Input} />
                    <div className="height-inline form-group">
                        <div className="feet-height">
                            <Field
                                label="Feet"
                                name="customer.feet"
                                component={DropdownSelect}
                                data={feet}
                                valueField="value"
                                textField="label"/>
                        </div>
                        <div className="inch-height">
                            <Field
                                label="Inches"
                                name="customer.inches"
                                component={DropdownSelect}
                                data={inch}
                                valueField="value"
                                textField="label"/>
                        </div>
                    </div>
                    {/*
                     <Field name="medicalHistory" label="Medical History" type="text" component={Input} />
                     <Field name="fitnessLevel" label="Your Fitness Level" type="text" component={Input} />
                     <Field name="fitnessGoal" label="Your Fitness Goal" type="text" component={Input} />
                     <Field name="bodyFocus" label="Your Body Focus" type="text" component={Input} />
                     */}
                    <Field name="phone" label="Phone" type="text" component={Input} />
                    <p className="text-center marginBottom50">What trainer type do you prefer?</p>
                    <Field name="customer.preferredTrainerGender" label="Gender" component={InlineButtonList} values={GENDER_LIST} />
                    {/*<div>
                        <label>Training Style</label>
                        <div>
                            <Field name="trainingStyle" component="select" className="form-control marginBottom50">
                                <option>Any Style</option>
                                <option>Yoga</option>
                                <option>Pilates</option>
                                <option>Stretch</option>
                            </Field>
                        </div>
                    </div>
                    */}
                    <button type="submit" className="btn btn-info btn-lg btn-block"  disabled={isFetching}>Save Changes</button>
                </form>
            </div>
        );
    }
}

const form = reduxForm({
  form: 'EditProfileForm',
  validate,
})(EditProfileForm);

const mapStateToProps = (state) => {
  return {
    initialValues: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(form);
