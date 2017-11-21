import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Input from '@shared/components/Form/Input';

const validate = values => {
    const errors = {};
    if(!values.title) {
        errors.title = 'Required'
    }
    if(!values.url) {
        errors.url = 'Required'
    }
    if(!values.description) {
        errors.description = 'Required'
    }
    return errors
};

class PrizesForm extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        const { handleSubmit, onClose} = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6">
                                        <Field name="title" label="Name" component={Input}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <Field name="url" label="Url" component={Input}/>
                                    </div>
                                    <div className="col-xs-12 col-sm-12">
                                        <Field name="description" label="Description" component={Input}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                                <button type="submit" className="btn btn-block btn-default marginBottom20">Add Company Prize</button>
                                <button type="button" onClick={onClose} className="btn btn-block btn-info">Close</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'AddPrize',
    destroyOnUnmount: true,
    validate
})(PrizesForm)