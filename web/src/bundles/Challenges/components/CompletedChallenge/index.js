import React, {Component, PropTypes} from 'react';
import CompletedChallengeCard from './ChallengeCard';
import ChallengeWinners from './ChallengeWinners';
import ChallengeDetails from '@Challenges/components/ChallengeDetails';
import moment from 'moment';

export default class CompletedChallenge extends Component {
    static propTypes = {
        challenge: PropTypes.array.isRequired,
        winner: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {challenge, params, leaders} = this.props;
        let item = challenge.find(ch => (ch.id == params.id));
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <CompletedChallengeCard challenges={challenge} params={params} />
                        {moment(item.dtEnd).isBefore(moment()) && <ChallengeWinners winner={this.props.winner}/>}
                    </div>
                </div>
                <ChallengeDetails challenges={challenge} leaders={leaders} params={params} />
            </div>
        )
    }
}