import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DateTimeInput from '@shared/components/Form/DateTimeInput';
import moment from 'moment';
import { nearestBookingTime } from '@shared/helpers';

const validate = (values) => {
  const errors = {};

  if (!values.day) {
    errors.day = 'Day Required';
  }
  if (!values.time) {
    errors.time = 'Time Required';
  }
    if(values.time) {
        let diff = moment.duration(moment(values.day + " " + values.time).diff(moment())).asMinutes();
        const isAfter = moment(values.day + " " + values.time).isAfter(moment());
        if(diff < 90 && !isAfter || diff < 90 && isAfter){
            errors.time = 'Nearest booking time should be 90 minutes from now';
        }
    }

  return errors;
};

let DateTimeForm = (props) => {
  const { handleSubmit, title} = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="day" label="Day" component={DateTimeInput} calendar time={false} min={new Date()}/>
      <Field name="time" label="Time" component={DateTimeInput} time calendar={false}/>
      <button type="submit" className="btn btn-info btn-lg btn-block">{title ? title: 'Continue'}</button>
    </form>
  );
};

let nearestTime = nearestBookingTime().local();

DateTimeForm = reduxForm({
  form: 'dateTimeForm',
  destroyOnUnmount: false,
  enableReinitialize : true,
  //Initial data for fields
  initialValues: {
    day: nearestTime.format('MM/DD/YYYY'),
    time: nearestTime.format('h:mm:ss a')
  },
  validate
})(DateTimeForm);

export default DateTimeForm;
