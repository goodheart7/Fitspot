import React, {Component, PropTypes} from 'react';
import ChallengeCard from './ChallengeCard';
import {Link} from 'react-router';
import moment from 'moment';

export default class CurrentChallenges extends Component {
    static propTypes = {
        challenges: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {challenges} = this.props;
        const challengesList = challenges.filter(f => (!moment(f.dtEnd).isBefore(moment()))).map(challenge => {
            return(
                <ChallengeCard key={challenge.name} challenge={challenge} />
            )
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="text-center marginBottom50">
                        <h2>Current Challenges</h2>
                    </div>
                    <div className="row">
                        {challengesList}
                    </div>
                    <div className="text-center col-xs-12 col-sm-4 col-sm-offset-4" style={{padding: '50px 0 75px 0'}}>
                        <Link className="btn btn-block btn-info" to="/challenges/create-challenge">Add New Challenge</Link>
                    </div>
                </div>
            </div>
        )
    }
}