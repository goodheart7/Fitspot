import React, {Component, PropTypes} from 'react';
import CompletedChallengeRow from './CompletedChallengeRow';
import moment from 'moment';

export default class CompletedChallenges extends Component {
    static propTypes = {
        challenges: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const _tableRow = this.props.challenges.map(row => {
            return (
                <CompletedChallengeRow key={row.name} challenge={row} />
            )
        });

        const {challenges} = this.props;
        const challenge = challenges.map(ch => ( moment(ch.dtEnd).isBefore(moment()) ?
            <CompletedChallengeRow key={ch.name} challenge={ch} /> : ''));
        return (
            <div>
                {challenge.length ? <div className="completed-challenges-container">
                        <div className="container">
                            <div className="row">
                                <div className="text-center marginBottom50">
                                    <h2>Completed Challenges</h2>
                                </div>
                                <table className="table table-striped table-custom">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {challenge}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> : ''}
            </div>
        )
    }
}