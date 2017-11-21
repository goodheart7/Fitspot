import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input';
import InlineButtonList from '@shared/components/Form/InlineButtonList';
import DateTimeInput from '@shared/components/Form/DateTimeInput';
import CONSTS from '@utils/Consts';
import DropdownSelect from '@shared/components/Form/DropdownSelect';

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

const validate = (values) => {
  const errors = {};

  if (!values.birthday) {
    errors.birthday = 'Required';
  }

  if (!values.feet) {
    errors.feet = 'Required';
  }

  if (!values.inch) {
     errors.inch = 'Required';
  }

  if (!values.weight) {
    errors.weight = 'Required';
  }

  return errors;
};


const generateFeet = () => {
  let _temp = [];
  for(let i = 1; i <= 7; ++i){
    _temp.push({
        label: i+'ft',
        value: i
    })
  }
  return _temp;
};

const generateInches = () => {
  let _temp = [];
  for(let i = 0; i <= 11; ++i){
    _temp.push({
        label: i+'in',
        value: i
    })
  }
  return _temp;
};

const feet = generateFeet();

const inch = generateInches();

const OnboardForm = (props) => {
  const { handleSubmit } = props;



  // TODO: Medical history?
  return (
    <form onSubmit={handleSubmit}>
      <Field name="birthday" label="Your Birth Date" placeholder="MM/DD/YYYY" component={DateTimeInput} time={false} />
      <Field name="weight" label="Your Weight (lbs)" placeholder="150" type="input" component={Input} />
      <div className="height-inline form-group">
        <div className="feet-height">
          <Field
              label="Feet"
              name="feet"
              component={DropdownSelect}
              data={feet}
              valueField="value"
              textField="label"/>
        </div>
        <div className="inch-height">
          <Field
              label="Inches"
              name="inch"
              component={DropdownSelect}
              data={inch}
              valueField="value"
              textField="label"/>
        </div>
      </div>
      <Field name="preferredTrainerGender" label="Do you prefer a trainer gender?" component={InlineButtonList} values={GENDER_LIST} />
      <button type="submit" className="btn btn-info btn-lg btn-block">Complete Sign Up</button>
    </form>
  );
}

export default reduxForm({
  form: 'customerOnboardForm',
  initialValues: {
      preferredTrainerGender: 0,
  },
  validate,
})(OnboardForm);
