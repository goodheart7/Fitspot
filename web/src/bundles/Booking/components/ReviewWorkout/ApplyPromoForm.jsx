import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Input from '@shared/components/Form/Input';

const validate = (values) => {
  const errors = {};
  if (!values.promocode) {
    errors.promocode = 'Required';
  }

  return errors;
};

const ApplyPromoForm = (props) => {
  const { handleSubmit, isFetching, error } = props;
  return (
    <div className="subscribe-row" style={{borderBottom: 0, paddingBottom: 0}}>
      <form onSubmit={handleSubmit}>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <label>PROMO CODE - Optional</label>
        <div className="inline-container">
          <Field name="promocode"  type="text" component={Input} />
          <button type="submit" className="btn btn-info btn-lg btn-block" disabled={isFetching}>Apply Promo</button>
        </div>
      </form>
    </div>
  );
};

const form = reduxForm({
  form: 'ApplyPromoForm',
  validate,
})(ApplyPromoForm);

const mapStateToProps = (state) => {
  return {
  };
}

export default connect(mapStateToProps)(form);
