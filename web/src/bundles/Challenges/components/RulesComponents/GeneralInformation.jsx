import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const GeneralInformation = (props) => {

    const departmentsData = [
        'Products',
        'Finance',
        'Marketing',
        'Customer Support',
        'Operations',
        'Strategy',
        'Events',
        'States',
        'Cross-Functionl',
        'Sales'
    ];
    const departments = departmentsData.map((department, index) => {
        return (
            <span key={index} className="col-xs-4 marginBottom20">
                {department}
            </span>
        )
    });

    const challenge = props.challenges.find(c => (c.id === +props.params.id));

    const rules = challenge.generalRules.map((rule, index) => {
        return(
            <div className="border-bottom border-top header-subheader col-xs-12 col-sm-12" key={index}>
                <h2>
                    <small>Rule {index + 1}</small>
                    {rule.title}
                </h2>
            </div>
        )
    });

    const prizes = challenge.prizes.map(item => {
        return(
            <div className="border-bottom border-top header-subheader col-xs-6 col-sm-6" key={item.prize.rank}>
                <h2>
                    <small>{item.rank} Place Prize</small>
                    {item.prize.title}
                    <p className="prize-meta">{item.prize.description}</p>
                    <Link href={item.prize.link}>{item.prize.link}</Link>
                </h2>
            </div>
        )
    });

    const {params} = props;
    return(
        <div className="marginBottom50" >
            <h3 className="col-xs-12 text-center marginBottom50" style={{marginTop: 35}}>General Information</h3>
            <div className="border-bottom border-top header-subheader col-xs-6 col-sm-6">
                <h2>
                    <small>start date</small>
                    {moment(challenge.dtStart).format('MMMM Do YYYY')}
                </h2>
            </div>
            <div className="border-bottom border-top header-subheader col-xs-6 col-sm-6">
                <h2>
                    <small>end date</small>
                    {moment(challenge.dtEnd).format('MMMM Do YYYY')}
                </h2>
            </div>
            {rules}
            {prizes}
            <div className="border-bottom border-top header-subheader col-xs-12 col-sm-12 marginBottom50">
                <h2>
                    <small className="marginBottom20">Departments</small>
                    <div className="row">
                        {departments}
                    </div>
                </h2>
            </div>
            <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                {moment(challenge.dtStart).isAfter(moment()) && <Link to={`/challenges/edit-challenge/${params.id}`} className="btn btn-info btn-block">Edit General Information</Link>}
            </div>
        </div>
    )
};

export default GeneralInformation;