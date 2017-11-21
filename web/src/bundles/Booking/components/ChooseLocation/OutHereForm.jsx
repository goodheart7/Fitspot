import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import Input from '@shared/components/Form/Input';
import moment from 'moment';

const validate = (values) => {
    const errors = {};

    if (!values.address) {
        errors.address = 'Address Required';
    }
    if (!values.city) {
        errors.city = 'City Required';
    }
    if (!values.state) {
        errors.state = 'State Required';
    }
    if (!values.zip) {
        errors.zip = 'ZipCode Required';
    }

    return errors;
};

class OutHereForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { //if street number append to street
            street_number: ''
        }
    }

    onSubmit = (values, dispatch) => {
        values.lat = this.props.locationData.lat;
        values.lon = this.props.locationData.lng;
        values.name = 'Custom Location';
        this.props.onSubmitWithProps(values, dispatch, this.props)
    }

    componentWillReceiveProps(nextProps){
        switch(nextProps.addressType){
            case 'street_number':
                this.setState({
                    street_number: nextProps.addressValue
                });
                break;
            case 'route':
                let route = nextProps.addressValue;
                this.props.dispatch(change('outHereForm', 'address', `${this.state.street_number} ${route}`));
                break;
            case 'locality':
                this.props.dispatch(change('outHereForm', 'city', nextProps.addressValue));
                break;
            case 'administrative_area_level_1':
                this.props.dispatch(change('outHereForm', 'state', nextProps.addressValue));
                break;
            case 'postal_code':
                this.props.dispatch(change('outHereForm', 'zip', nextProps.addressValue));
                break;
            default:
                this.setState({street_number: ''});
                return '';
        }
    }
    render() {
        const { handleSubmit, title} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field name="address" label="Address" component={Input} />
                <Field name="AptFloorSuite" label={<div>Apt / Floor / Suite # <small>- Optional</small></div>} component={Input} />
                <Field name="city" className="form-group col-xs-6 kill-left-padding" label="City" component={Input} />
                <Field name="state" className="form-group col-xs-3" label="State" component={Input} />
                <Field name="zip" className="form-group col-xs-3 kill-right-padding" label="ZipCode" component={Input}/>
                <Field name="parking" label={<div>Parking Instructions, etc. <small>- Optional</small></div>} component={Input} />
                <button type="submit" className="btn btn-info btn-lg btn-block">Choose This Location</button>
            </form>
        );
    }
}

OutHereForm = reduxForm({
    form: 'outHereForm',
    destroyOnUnmount: false,
    validate
})(OutHereForm);

export default OutHereForm;
