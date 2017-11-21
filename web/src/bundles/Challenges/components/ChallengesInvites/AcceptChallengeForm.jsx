import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Checkbox from '@shared/components/Form/Checkbox';

const AcceptChallengeForm = (props) => {
    const { handleSubmit } = props;
    const challenges = props.challenges.map(challenge => {
       return (
           <Field key={challenge} className="checkbox col-xs-4" name={challenge} label={challenge} id={challenge} component={Checkbox} type="checkbox"/>
       )
    });
    return (
        <div>
            <h4 className="marginBottom50"><b>Flow Traders Has Invited You to a Challenge!</b></h4>
            <h4 className="marginBottom20">Flow Traders Example Challenge</h4>
            <form onSubmit={handleSubmit}>
                <div className="row no-padding marginBottom20">
                    {challenges}
                </div>
                <button type="submit" className="btn btn-default btn-block">Challenge Accepted!</button>
                <button onClick={::props.onCancel} type="button" className="btn btn-info btn-block">No Thanks</button>
            </form>
        </div>
    )
};

export default reduxForm({
    form: 'InviteWizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(AcceptChallengeForm)