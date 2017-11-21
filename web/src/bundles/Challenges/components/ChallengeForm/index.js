import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import Input from '@shared/components/Form/Input';
import Checkbox from '@shared/components/Form/Checkbox';
import DateTimeInput from '@shared/components/Form/DateTimeInput';
import Activities from '@Challenges/components/RulesComponents/Activities';
import PrizesForm from './PrizesForm';
import DropdownSelect from '@shared/components/Form/DropdownSelect';


const validate = values => {
    const errors = {};
    if(!values.name) {
        errors.name = 'Required'
    }
    if (!values.generalRules || !values.generalRules.length) {
        errors.generalRules = { _error: 'At least one rule must be entered' }
    } else {
        const rulesArrayErrors = [];
        values.generalRules.forEach((rule, ruleIndex) => {
            const ruleErrors = {};
            if (!rule || !rule.title) {
                ruleErrors.title = 'Required';
                rulesArrayErrors[ruleIndex] = ruleErrors
            }
        });
        if(rulesArrayErrors.length) {
            errors.generalRules = rulesArrayErrors
        }
    }
    if (!values.challengePrizes || !values.challengePrizes.length) {
        errors.challengePrizes = { _error: 'At least one three prizes must be entered' }
    } else {
        const prizesArrayErrors = [];
        values.challengePrizes.forEach((prize, prizeIndex) => {
            const prizeErrors = {};
            if (!prize || !prize.description) {
                prizeErrors.description = 'Required';
                prizesArrayErrors[prizeIndex] = prizeIndex
            }
            if (!prize || !prize.name) {
                prizeErrors.name = 'Required';
                prizesArrayErrors[prizeIndex] = prizeIndex
            }
            if (!prize || !prize.url) {
                prizeErrors.url = 'Required';
                prizesArrayErrors[prizeIndex] = prizeIndex
            }
        });
        if(prizesArrayErrors.length) {
            errors.challengePrizes = prizesArrayErrors
        }
    }
    return errors
}

class ChallengeForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            addNew: false
        }
    }

    handleSubmit(form) {
        this.props.addPrize(form);
        this.setState({
            addNew: false,
            prize: null
        })
    }
    onChange = (e) => {
        if(e.target.checked){
            this.setState({
                prize: e.target.name
            })
        }else {
            this.setState({
                prize: null
            })
        }

    };

    close() {
        this.setState({
            addNew: false
        })
    }

    render(){
        const { handleSubmit, companyList, prizes, challenges, params } = this.props;
        const departments = companyList[0].departments.map(department => {
            return (
                <span key={department.name} className="col-xs-4 marginBottom20">
                    <Field className="checkbox" style={{fontWeight: 300}} label={department.name} component={Checkbox} name={department.name} />
                </span>
            )
        });

        const locations = companyList[0].officeLocations.map(location => {
            return (
                <span key={location.name} className="col-xs-4 marginBottom20">
                    <Field className="checkbox" style={{fontWeight: 300}} label={location.name} component={Checkbox} name={location.name} />
                </span>
            )
        });

        const renderRules = ({ fields, meta: { touched, error, submitFailed } }) => (
            <div className="col-xs-12">
                {fields.map((rule, index) =>
                    <div key={index} className="fieldArray-container relative">
                        <button
                            type="button"
                            title="Remove rule"
                            className="btn btn-link absolute-link right"

                            onClick={() => fields.remove(index)}>Delete</button>
                        <Field
                            name={`${rule}.title`}
                            type="text"
                            component={Input}
                            label={`Rule ${index + 1}`}/>

                    </div>
                )}
                <button type="button" className="btn btn-link" onClick={() => fields.push({})}>+ Add Rule</button>
                {(touched || submitFailed) && error && <span>{error}</span>}
            </div>
        );
        const fetchedPrizes = prizes.map(prize => ({value: prize.id, label: prize.title}));
        const renderPrizes = ({ fields, meta: { touched, error, submitFailed } }) => (
            <div className="col-xs-12">
                {fields.map((prize, index) => {
                    let places = [];
                    places.push({value: index + 1, label: `${index + 1} Place`});
                    return (
                        <div key={index} className="fieldArray-container relative border-bottom" style={{paddingTop: 35}}>
                            <small className="fieldArray-title marginBottom20">Prize {index + 1}
                                <button
                                    type="button"
                                    title="Remove prize"
                                    className="btn btn-link absolute-link right"
                                    onClick={() => fields.remove(index)}>Delete</button>
                            </small>
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <Field
                                        className="form-group"
                                        form="createChallenge"
                                        name={`${prize}.rank`}
                                        valueField='value'
                                        textField='label'
                                        component={DropdownSelect}
                                        data={places}
                                    />
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Field
                                        className="form-group"
                                        form="createChallenge"
                                        name={`${prize}.prizeId`}
                                        valueField='value'
                                        textField='label'
                                        component={DropdownSelect}
                                        data={fetchedPrizes}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                    }

                )}
                <button type="button" className="btn btn-link" onClick={() => fields.push()}>+ Add Prize</button>
                {(touched || submitFailed) && error && <span>{error}</span>}
            </div>
        );

        return (
            <div>
                <form onSubmit={handleSubmit} id="createChallenge" /> {/* one form for two forms */}
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <Field form="createChallenge" name='name' label='Challenge Name' id='name' component={Input} type="text"/>
                            <Field form="createChallenge" name='description' label='Description' id='name' component={Input} type="text"/>
                            <div className="row">
                                <div className="col-xs-12 col-sm-6">
                                    <Field form="createChallenge" name="dtStart" label="Start Date" component={DateTimeInput} calendar time={false} min={new Date()}/>
                                </div>
                                <div className="col-xs-12 col-sm-6">
                                    <Field form="createChallenge" name="dtEnd" label="End Date" component={DateTimeInput} calendar time={false} min={new Date()}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gray-container">
                    <div className="container">
                        <div className="row">
                            <Activities challenges={challenges} params={params} onSubmit={::this.props.activities}/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h2 className="marginBottom50 text-center" style={{marginTop: 35}}>
                                Open To
                            </h2>
                        </div>
                    </div>
                    {departments.length ?
                        <div className="header-subheader border-top border-bottom">
                            <h4>
                                <small className="marginBottom20" style={{marginTop: 35, marginLeft: 25}}>Departments</small>
                                <div className="row">
                                    {departments}
                                </div>
                            </h4>
                        </div> : ''}
                    {locations.length ?
                        <div className="header-subheader border-top border-bottom marginBottom50">
                            <h4>
                                <small className="marginBottom20" style={{marginTop: 35, marginLeft: 25}}>Locations</small>
                                <div className="row">
                                    {locations}
                                </div>
                            </h4>
                        </div>: ''}
                </div>
                <div className="gray-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 border-bottom">
                                <h2 className="marginBottom50 text-center">
                                    Rules
                                </h2>
                            </div>
                            <FieldArray form="createChallenge" name="generalRules" component={renderRules} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h2 className="marginBottom50 text-center" style={{marginTop: 50}}>
                                Prizes
                            </h2>
                        </div>
                        <FieldArray form="createChallenge" name="challengePrizes" component={renderPrizes} />
                        {this.state.addNew ? <PrizesForm onSubmit={::this.handleSubmit} onClose={::this.close} /> : renderPrizes.length ? <div className="header-subheader">
                                    <h4>
                                        <div className="row">
                                            {renderPrizes}
                                        </div>
                                    </h4>
                                </div> : ''}
                        <div className="col-xs-12 col-sm-4 col-sm-offset-4 marginBottom50">
                            {!this.state.addNew && <button type="button" className="btn btn-info btn-block" onClick={() => (this.setState({addNew: true}))}>Add Company Prize</button>}
                        </div>
                        {/* <FieldArray form="createChallenge" name="challengePrizes" component={renderPrizes} /> */}
                    </div>
                </div>
                <div className="gray-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                                <button form="createChallenge" type="submit" className="btn btn-block btn-default">
                                    {!params ? 'Create Challenge' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default reduxForm({
    form: 'CreateChallenge',
    destroyOnUnmount: false,
    validate
})(ChallengeForm)