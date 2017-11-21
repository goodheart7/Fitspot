import React, {Component, PropTypes} from 'react';
import Leaderboard from './ChallengeDetailsComponents/Leaderboard';
import Enrolled from './ChallengeDetailsComponents/Enrolled';
import Rules from './ChallengeDetailsComponents/Rules';
import moment from 'moment';

export default class ChallengeDetails extends Component {
    static propTypes = {
        challenges: PropTypes.array.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            active: moment(props.challenges.find(i => (i.id === +props.params.id)).dtStart).isBefore(moment()) ? 'leaders' : 'enrolled'
        }
    }
    _makeActive = (e) => (this.setState({active: e}));
    render() {
        const {active} = this.state;
        const {challenges, leaders, params} = this.props;
        return (
            <div className="challenge-details-container">
                <div className="container">
                    <div className="row">
                        <div className="marginBottom50 text-center">
                            <div className="col-xs-12">
                                <ul className="tab-toggles">
                                    {
                                        moment(challenges.find(i => (i.id === +params.id)).dtStart).isBefore(moment()) ?
                                            <li className={active === 'leaders' && 'active'} onClick={() => this._makeActive('leaders')}>Leaderboard</li> :
                                            <li className={active === 'enrolled' && 'active'} onClick={() => this._makeActive('enrolled')}>Enrolled</li>
                                    }

                                    <li className={active === 'rules' && 'active'} onClick={() => this._makeActive('rules')}>View Rules</li>
                                </ul>
                            </div>
                        </div>
                        {active === 'leaders' && <Leaderboard leaders={leaders} />}
                        {active === 'enrolled' && <Enrolled />}
                        {active === 'rules' && <Rules challenges={challenges} params={params}/>}
                    </div>
                </div>
            </div>
        )
    }
}