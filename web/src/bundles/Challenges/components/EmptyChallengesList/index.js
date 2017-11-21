import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';


const EmptyChallengesList = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <div className="text-center marginBottom50">
                        <h2>Flow Traders Challenges</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                    <div className="text-center ">
                        <div className="svg-image marginBottom50">
                            <img src={require('../../assets/flag.svg')} alt="No challenges"/>
                        </div>
                        <p><strong>No challenges</strong></p>
                        <p className="marginBottom50">
                            Get your workforces involved with Fitspot Challenges. Just add a few activities
                            and choose your launch date to get started. Fitspot companies have had 50%
                            decrease healthcare costs.
                        </p>
                        <Link className="btn btn-block btn-default" to="/challenges/create-challenge">Add New Challenge</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyChallengesList;
